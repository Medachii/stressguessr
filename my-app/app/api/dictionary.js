// Phonetics and definitions come from freedictionaryapi.com (Wiktionary data),
// audio files come from Wikimedia Commons, found through the word's Wiktionary page.

const FREE_DICTIONARY_URL = "https://freedictionaryapi.com/api/v1/entries/en/";
const WIKTIONARY_URL = "https://en.wiktionary.org/w/api.php?action=parse&prop=wikitext&format=json&redirects=1&origin=*&page=";
const COMMONS_FILE_URL = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const AMERICAN_TAGS = ["General American", "US"];
const AMERICAN_ACCENTS = /\b(US|GA|GenAm|General American|California|New York|Canada)\b/i;

// The word has no entry or no phonetic transcription in the dictionary
export class WordNotFoundError extends Error {
  constructor(word) {
    super("Word not found: " + word);
  }
}

function isAmerican(pronunciation) {
  return pronunciation.tags.some((tag) => AMERICAN_TAGS.includes(tag));
}

// Prefer an American transcription that marks the stress, like the audio we play
function choosePronunciation(candidates) {
  return (
    candidates.find((c) => isAmerican(c.pronunciation) && c.pronunciation.text.includes("ˈ")) ||
    candidates.find((c) => c.pronunciation.text.includes("ˈ")) ||
    candidates.find((c) => isAmerican(c.pronunciation)) ||
    candidates[0]
  );
}

function firstDefinition(entry) {
  return entry.senses?.length ? entry.senses[0].definition : "";
}

async function loadEntry(word) {
  const response = await fetch(FREE_DICTIONARY_URL + encodeURIComponent(word));
  if (response.status === 404) {
    throw new WordNotFoundError(word);
  }
  if (!response.ok) {
    throw new Error("Dictionary unavailable (" + response.status + ")");
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

  const chosen = choosePronunciation(candidates);
  if (chosen === undefined) {
    throw new WordNotFoundError(word);
  }

  const entryWithDefinition = chosen.entry.senses?.length ? chosen.entry : data.entries.find((e) => e.senses?.length);

  // One pronunciation per entry (noun, verb...), used to spot homographs
  // whose stress depends on the meaning, like "present" or "record"
  const variants = data.entries
    .map((entry) => {
      const best = choosePronunciation(candidates.filter((c) => c.entry === entry));
      return best && {
        partOfSpeech: entry.partOfSpeech,
        phonetic: best.pronunciation.text,
        definition: firstDefinition(entry),
      };
    })
    .filter(Boolean);

  return {
    phonetic: chosen.pronunciation.text,
    definition: entryWithDefinition ? firstDefinition(entryWithDefinition) : "",
    partOfSpeech: (entryWithDefinition || chosen.entry).partOfSpeech,
    variants,
  };
}

// Each word is only requested once per visit
const entryCache = new Map();
const audioCache = new Map();

// Returns { phonetic, definition, variants } for a word, or throws if the word is unknown.
export function fetchEntry(word) {
  const key = word.toLowerCase();
  if (!entryCache.has(key)) {
    const promise = loadEntry(key);
    // Network errors can be retried later, unknown words stay unknown
    promise.catch((error) => {
      if (!(error instanceof WordNotFoundError)) {
        entryCache.delete(key);
      }
    });
    entryCache.set(key, promise);
  }
  return entryCache.get(key);
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

async function loadAudioUrl(word) {
  const response = await fetch(WIKTIONARY_URL + encodeURIComponent(word));
  const data = await response.json();
  const file = data.parse ? pickAudioFile(data.parse.wikitext["*"]) : undefined;
  return file ? audioFileUrl(file) : "";
}

// Returns a playable audio URL for a word, or "" when Wiktionary has no recording
export function fetchAudioUrl(word) {
  const key = word.toLowerCase();
  if (!audioCache.has(key)) {
    audioCache.set(key, loadAudioUrl(key).catch((error) => {
      console.log(error);
      audioCache.delete(key);
      return "";
    }));
  }
  return audioCache.get(key);
}

export function playAudio(url) {
  if (url) {
    new Audio(url).play();
  }
}
