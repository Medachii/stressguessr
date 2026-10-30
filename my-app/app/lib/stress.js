import phonemes from "./phonemes.json";

// Finds which letter of a written word carries the stress, using its phonetic
// transcription (e.g. "/ˈæk.tə/") and the phoneme -> letters table in phonemes.json.
// Returns the index of the first letter of the stressed syllable,
// or a negative number when no stress was found.
export function findStressIndex(word, phonetic) {
  let stress = -2;
  let wordFinished = false;

  function findRecursiveStress(index, finalWord) {
    if (wordFinished === true) {
      return;
    }

    if (phonetic[index] === "/" || phonetic[index] === "]" || phonetic[index] === undefined) {
      if (stress === -2) {
        stress = -1;
      }
      wordFinished = true;
      return;
    }

    if (phonetic[index] === "ˈ") {
      if (finalWord.length > stress) {
        stress = finalWord.length;
      }
    }

    // Unknown symbols are treated as silent instead of crashing the search
    const graphemes = phonemes[phonetic[index]] || [""];
    for (let i = 0; i < graphemes.length; i++) {
      if (wordFinished === true) {
        break;
      }
      const nextWord = finalWord + graphemes[i];

      // Only keep exploring while the spelling still matches the beginning of the word
      if (word.startsWith(nextWord)) {
        findRecursiveStress(index + 1, nextWord);
      }
    }
  }

  if (phonetic.includes("ˈ")) {
    findRecursiveStress(1, "");
  }

  return stress;
}

// Groups the pronunciations of a dictionary entry by where their stress falls.
// Most words give one reading; homographs like "present" (noun / verb) give several.
// The reading of the main pronunciation always comes first.
export function stressReadings(word, entry) {
  const main = { ...analyzeStress(word, entry.phonetic), phonetic: entry.phonetic, partsOfSpeech: [], definition: entry.definition };
  const readings = [main];

  for (const variant of entry.variants || []) {
    const result = analyzeStress(word, variant.phonetic);
    if (result.status === "unknown") {
      continue;
    }
    let reading = readings.find((r) => r.status === result.status && r.index === result.index);
    if (reading === undefined) {
      reading = { ...result, phonetic: variant.phonetic, partsOfSpeech: [], definition: variant.definition };
      readings.push(reading);
    }
    if (variant.partOfSpeech && !reading.partsOfSpeech.includes(variant.partOfSpeech)) {
      reading.partsOfSpeech.push(variant.partOfSpeech);
    }
  }

  // A transcription without stress mark next to stressed ones is usually incomplete data
  const stressed = readings.filter((r) => r.status === "stressed");
  if (stressed.length > 0) {
    return main.status === "stressed" ? [main, ...stressed.filter((r) => r !== main)] : stressed;
  }
  return [main];
}

// Same as findStressIndex but says why there is no stress:
// "stressed", "none" (the transcription has no stress mark, e.g. one syllable)
// or "unknown" (the spelling could not be matched with the transcription)
export function analyzeStress(word, phonetic) {
  const index = findStressIndex(word, phonetic);
  if (index >= 0 && index < word.length) {
    return { status: "stressed", index };
  }
  return { status: phonetic.includes("ˈ") ? "unknown" : "none", index: -1 };
}
