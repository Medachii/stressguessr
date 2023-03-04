import React from "react";

const Letter = ({ lettre }) => {

  const phonemedictionnary = {
    '/': ['none'],
    'h': ['h'],
    'ə': ['e', 'a', 'ure', 'er', 'io', 'none'],
    'l': ['l', 'le'],
    'o': ['o'],
    'ʊ': ['u', 'oul', 'none'],
    '.': ['none'],
    'ɪ': ['i'],
    'i': ['i', 'ee', 'ea'],
    't': ['t', 'tt'],
    'ˈ': ['here'],
    'b': ['b'],
    'ɑ': ['a'],
    'æ': ['a'],
    'e': ['e'],
    'ɝ': ['ear', 'ur'],
    'ɒ': ['o'],
    'ʌ': ['u'],
    'ɔ:': ['o', 'a', 'ou'],
    'u': ['u', 'oo', 'ue'],
    'ː': ['none'],
    'aɪ': ['ai', 'i', 'eye'],
    'aʊ': ['ow', 'ou'],
    'eɪ': ['ay', 'ey', 'ei'],
    'oʊ': ['o', 'ou', 'ow'],
    'ɔɪ': ['oi', 'oy', 'oye'],
    'ɛ': ['e', 'ea'],
    'ɹ': ['r', 're'],
    'd': ['d'],
    'f': ['f'],
    'g': ['g'],
    'j': ['y', 'j'],
    'k': ['k', 'c', 'ck'],
    'm': ['m'],
    'n': ['n'],
    'ŋ': ['ng', 'n'],
    'p': ['p'],
    'r': ['r'],
    's': ['s', 'ss'],
    'ʃ': ['sh', 'ch'],
    'tʃ': ['ch', 'tch'],
    'θ': ['th'],
    'ð': ['th'],
    'v': ['v'],
    'w': ['w'],
    'z': ['z'],
    'ʒ': ['zh', 'j', 's',],
    'd͡ʒ': ['j', 'g', 'ge', 'dge']
  }

  const letterPushed = () => {
    console.log("letter pushed");
    const Http = new XMLHttpRequest();

    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/{}".replace(
      "{}",
      "hello"
    );
    Http.open("GET", url);
    Http.send();
    Http.responseType = "json";
    Http.onload = () => {
      if (Http.readyState == 4 && Http.status == 200) {
        const data = Http.response;

        let extractedPhoneme = extractPhoneme(data);
        let phonemeTrad = phonemeTraitement(extractedPhoneme);

        let phoneme = phonemeTrad[0];
        let stress = phonemeTrad[1];

        console.log(phoneme);
        console.log(stress);
      } else {
        console.log(`Error: ${Http.status}`);
      }
    };
  };

  const extractPhoneme = (data) => {
    var phoneme = data[0].phonetics[0].text;
    //tant que le phoneme est null
    let i = 1;
    while (phoneme == null) {
      phoneme = data[0].phonetics[i].text;
      i++;
    }
    return phoneme;
  };

  const phonemeTraitement = (phoneme) => {
    var translation = "";
    var stress = "none";
    for (let i = 0; i < phoneme.length; i++) {
      var letter = phonemedictionnary[phoneme[i]]; //TODO
      console.log("letter : " + letter);
      if (letter == "none") {
        continue;
      }
      if (letter == "here") {
        stress = i;
        continue;
      }
      translation += letter;
    }
    console.log("stress" + stress);
    return [translation, stress - 1];
  };

  return (
    <button className="letter" onClick={letterPushed}  >
      {lettre}
    </button>
  );
};

export default Letter;
