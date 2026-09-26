// Phonetics and definitions come from freedictionaryapi.com (Wiktionary data),
// audio files come from Wikimedia Commons, found through the word's Wiktionary page.

const FREE_DICTIONARY_URL = "https://freedictionaryapi.com/api/v1/entries/en/";
const WIKTIONARY_URL = "https://en.wiktionary.org/w/api.php?action=parse&prop=wikitext&format=json&redirects=1&origin=*&page=";
const COMMONS_FILE_URL = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const AMERICAN_TAGS = ["General American", "US"];
const AMERICAN_ACCENTS = /\b(US|GA|GenAm|General American|California|New York|Canada)\b/i;

function isAmerican(pronunciation) {
  return pronunciation.tags.some((tag) => AMERICAN_TAGS.includes(tag));
}

// Returns { phonetic, definition } for a word, or throws if the word is unknown.
export async function fetchEntry(word) {
  const response = await fetch(FREE_DICTIONARY_URL + encodeURIComponent(word));
  if (!response.ok) {
    throw new Error("Word not found: " + word);
  }
  const data = await response.json();

  // Flatten every IPA transcription and remember which entry it comes from
  const candidates = [];
  data.entries.forEach((entry) => {
    (entry.pronunciations || []).forEach((pronunciation) => {
      if (pronunciation.type === "ipa") {
        candidates.push({ entry, pronunciation });
      }
    });
  });

  // Prefer an American transcription that marks the stress, like the audio we play
  const chosen =
    candidates.find((c) => isAmerican(c.pronunciation) && c.pronunciation.text.includes("ˈ")) ||
    candidates.find((c) => c.pronunciation.text.includes("ˈ")) ||
    candidates.find((c) => isAmerican(c.pronunciation)) ||
    candidates[0];

  if (chosen === undefined) {
    throw new Error("No phonetic for: " + word);
  }

  const entryWithDefinition = chosen.entry.senses?.length ? chosen.entry : data.entries.find((e) => e.senses?.length);

  return {
    phonetic: chosen.pronunciation.text,
    definition: entryWithDefinition ? entryWithDefinition.senses[0].definition : "",
  };
}

// Picks the best English audio file from a Wiktionary page, US accent first
export function pickAudioFile(wikitext) {
  const files = [...wikitext.matchAll(/\{\{audio\|en\|([^|}]+)(?:\|([^}]*))?\}\}/g)].map((match) => ({
    file: match[1].trim(),
    params: match[2] || "",
  }));

  const american = files.find((f) => /^en-us-/i.test(f.file) || AMERICAN_ACCENTS.test(f.params));
  return (american || files[0])?.file;
}

export function audioFileUrl(file) {
  return COMMONS_FILE_URL + encodeURIComponent(file.replace(/ /g, "_"));
}

// Returns a playable audio URL for a word, or "" when Wiktionary has no recording
export async function fetchAudioUrl(word) {
  try {
    const response = await fetch(WIKTIONARY_URL + encodeURIComponent(word));
    const data = await response.json();
    const file = data.parse ? pickAudioFile(data.parse.wikitext["*"]) : undefined;
    return file ? audioFileUrl(file) : "";
  } catch (error) {
    console.log(error);
    return "";
  }
}

export function playAudio(url) {
  if (url) {
    new Audio(url).play();
  }
}
