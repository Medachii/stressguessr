


const phonemedictionnary = {
  '/': ['none'],
  'h': ['h'],
  'ə': ['e', 'a', 'ure', 'er', 'io', 'none'],
  'l': ['l'],
  'o': ['o'],
  'ʊ': ['u', 'oul', 'none'],
  '.': ['none'],
  'ɪ': ['i'],
  'l': ['l', 'le'],
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


function getPhoneme(word) {
  const Http = new XMLHttpRequest();

  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/{}".replace('{}', word);
  Http.open("GET", url);
  Http.send();
  Http.responseType = "json";
  Http.onload = () => {
    if (Http.readyState == 4 && Http.status == 200) {
      const data = Http.response;
      let extractedPhoneme = extractPhoneme(data);
      return extractedPhoneme;
    }
  };

}

function findtheStress(word) {
  let phoneme = getPhoneme(word);
  let stress = 0;
  let index = 0;
  let traductedWord = "";
  while (phoneme[index] != null) {
    //use the dictionnary to traduce phoneme into his word form, put it in traductedWord and ensure that traductedWord==word


    //test first taking the two next phonemes
    let pho = phoneme[index];
    if (index + 1 < phoneme.length) {
      let pho2 = phoneme[index + 1];
      if (pho + pho2 in phonemedictionnary) {
        pho = pho + pho2;
      }
    }
    let trad = phonemedictionnary[pho];
    if (trad.length == 1) {
      traductedWord += trad[0];
    }
    else {
      //check the word given in parameter to find the good phoneme
      let i = 0;
      while (i < trad.length) {
        if (word.includes(trad[i])) {
          traductedWord += trad[i];
          break;
        }
        i++;
      }
    }
    console.log(traductedWord);
    return traductedWord;
  }

findtheStress("hello");


  //2 phonemes à verifier : ɔ: eɪ
  //vérifier si les deux prochains phoenemes existent ensembles, sinon en tester un




  function letterPushed() {
    console.log("letter pushed");
    const Http = new XMLHttpRequest();

    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/{}".replace('{}', "hello");
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
  }


  function extractPhoneme(data) {
    var phoneme = data[0].phonetics[0].text;
    //tant que le phoneme est null
    let i = 1;
    while (phoneme == null) {
      phoneme = data[0].phonetics[i].text;
      i++;
    }
    return phoneme;

  }

  function wordTraitement(word) {
    //we want to transform the double letter into a single letter
    for (let i = 0; i < word.length; i++) {
      if (word[i] == word[i + 1]) {
        word = word.slice(0, i) + word.slice(i + 1);
      }
    }
    return word;

  }

  function phonemeTraitement(phoneme) {
    var translation = "";
    var stress = "none";
    for (let i = 0; i < phoneme.length; i++) {
      var letter = phonemedictionnary[phoneme[i]];
      console.log("letter : " + letter);
      if (letter == 'none') {
        continue;
      }
      if (letter == 'here') {
        stress = i;
        continue;
      }
      translation += letter;

    }
    console.log("stress" + stress)
    return [translation, stress - 1];


  }


  // ========================================

}
