// French meanings of English words.
// First choice: the French Wiktionary (Wiktionnaire), which explains English words in French,
// sorted by part of speech. Otherwise the English definition is machine-translated with MyMemory.

const WIKTIONNAIRE_URL = "https://fr.wiktionary.org/w/api.php?action=parse&prop=wikitext&format=json&redirects=1&origin=*&page=";
const MYMEMORY_URL = "https://api.mymemory.translated.net/get?langpair=en|fr&q=";

// Section titles of the Wiktionnaire ({{S|nom|en}}) -> parts of speech of the English dictionary API
const SECTION_TO_POS = {
  nom: "noun",
  verbe: "verb",
  adjectif: "adjective",
  adverbe: "adverb",
  pronom: "pronoun",
  "préposition": "preposition",
  conjonction: "conjunction",
  interjection: "interjection",
  article: "article",
  "déterminant": "determiner",
  "numéral": "numeral",
  particule: "particle",
  contraction: "contraction",
  "préfixe": "prefix",
  suffixe: "suffix",
  locution: "phrase",
};

const MAX_MEANINGS = 3;

// Turns a wikitext definition line into plain text
function cleanDefinition(line) {
  let text = line.replace(/^#\s*/, "");
  text = text.replace(/<ref[^>]*\/>|<ref[^>]*>[\s\S]*?<\/ref>|<[^>]+>/g, "");

  // Templates, innermost first: {{lexique|musique|en}} -> (musique), the others are labels we drop
  let previous;
  do {
    previous = text;
    text = text.replace(/\{\{([^{}]*)\}\}/g, (match, content) => {
      const parts = content.split("|");
      if (parts[0] === "lexique" && parts[1]) {
        return "(" + parts[1] + ")";
      }
      if (parts[0] === "w" && parts[1]) {
        return parts[2] || parts[1];
      }
      return "";
    });
  } while (text !== previous);

  text = text
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, "$1")
    .replace(/'''?/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/^[\s,;:.]+/, "")
    .trim();

  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Returns { noun: ["Cadeau, don.", ...], verb: [...] } from the English section of the Wiktionnaire page
export function parseWiktionnaire(wikitext) {
  const start = wikitext.indexOf("{{langue|en}}");
  if (start < 0) {
    return {};
  }
  let section = wikitext.slice(start);
  const end = section.indexOf("== {{langue|", 1);
  if (end > 0) {
    section = section.slice(0, end);
  }

  const meanings = {};
  let currentPos = null;
  for (const line of section.split("\n")) {
    const header = line.match(/^===\s*\{\{S\|([^|}]+)/);
    if (header) {
      const firstWord = header[1].trim().split(" ")[0];
      currentPos = SECTION_TO_POS[firstWord] || null;
      continue;
    }
    if (line.startsWith("==")) {
      currentPos = null;
      continue;
    }
    // "# " lines are definitions, "#*" and "#:" are examples
    if (currentPos && /^#[^*:#]/.test(line)) {
      const definition = cleanDefinition(line);
      if (definition) {
        meanings[currentPos] = meanings[currentPos] || [];
        if (meanings[currentPos].length < MAX_MEANINGS) {
          meanings[currentPos].push(definition);
        }
      }
    }
  }
  return meanings;
}

const wiktionnaireCache = new Map();
const translationCache = new Map();

function fetchWiktionnaire(word) {
  const key = word.toLowerCase();
  if (!wiktionnaireCache.has(key)) {
    wiktionnaireCache.set(key, fetch(WIKTIONNAIRE_URL + encodeURIComponent(key))
      .then((response) => response.json())
      .then((data) => (data.parse ? parseWiktionnaire(data.parse.wikitext["*"]) : {}))
      .catch(() => {
        wiktionnaireCache.delete(key);
        return {};
      }));
  }
  return wiktionnaireCache.get(key);
}

function translate(text) {
  if (!translationCache.has(text)) {
    translationCache.set(text, fetch(MYMEMORY_URL + encodeURIComponent(text))
      .then((response) => response.json())
      .then((data) => {
        const translated = data.responseData && data.responseData.translatedText;
        // The free quota answers with a warning instead of a translation
        if (data.responseStatus !== 200 || !translated || /MYMEMORY WARNING/i.test(translated)) {
          throw new Error("Translation unavailable");
        }
        return translated;
      })
      .catch((error) => {
        translationCache.delete(text);
        throw error;
      }));
  }
  return translationCache.get(text);
}

// French meaning of a word for the given parts of speech.
// Returns { parts: [{ pos, text }], source } with one part per part of speech found,
// and source "wiktionary", "machine" or "english" (nothing found).
export async function fetchFrenchDefinition(word, partsOfSpeech, englishDefinition) {
  const meanings = await fetchWiktionnaire(word);
  const parts = (partsOfSpeech || [])
    .filter((pos) => meanings[pos] && meanings[pos].length)
    .map((pos) => ({ pos, text: meanings[pos].join(" ") }));
  if (parts.length) {
    return { parts, source: "wiktionary" };
  }

  if (englishDefinition) {
    try {
      return { parts: [{ pos: null, text: await translate(englishDefinition) }], source: "machine" };
    } catch (error) {
      return { parts: [{ pos: null, text: englishDefinition }], source: "english" };
    }
  }
  return { parts: [], source: "english" };
}
