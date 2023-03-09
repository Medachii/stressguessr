import React, { useEffect, useState } from "react";
import Letter from "./Letter";
import "../index.css";


const Word = ({ chosenWord, updatePoints, updateStress, oskur, oskur2 }) => {

  const [finalStress, setFinalStress] = useState("");
  const [definition, setDefinition] = useState("");



  const phonemedictionnary = {
    '/': ['none'],
    'h': ['h'],
    'ə': ['e', 'a', 'ure', 'er', 'io', 'o', 're', 'ou', ''],
    'o': ['o'],
    'ʊ': ['u', 'oul', 'o', 'ugh'],
    '.': [''],
    'ɪ': ['i', 'a', 'e', 'u'],
    'l': ['l', 'le', 'll'],
    'i': ['i', 'ee', 'ea', 'y', 'e'],
    't': ['t', 'tt', 'te', ''],
    'ˈ': [''],
    'ˌ': [''],
    'b': ['b', 'bb'],
    'ɑ': ['a'],
    'a': ['a', 'o'],
    'æ': ['a'],
    'e': ['e', 'a'],
    'ɝ': ['ear', 'ur'],
    'ɒ': ['o'],
    'ʌ': ['u'],
    'ɔ:': ['o', 'a', 'ou'],
    'u': ['u', 'oo', 'ue', 'ough'],
    'aɪ': ['ai', 'i', 'eye'],
    'aʊ': ['ow', 'ou'],
    'eɪ': ['ay', 'ey', 'ei'],
    'oʊ': ['o', 'ou', 'ow'],
    'ɔɪ': ['oi', 'oy', 'oye'],
    'ɛ': ['e', 'ea'],
    'ɜ': ['o', 'or', 'er'],
    'ɹ': ['r', 're', 'rar'],
    'd': ['d'],
    'f': ['f', 'ph', 'ff'],
    'g': ['g'],
    'j': ['y', 'j', ''],
    'k': ['k', 'c', 'ck', 'x', 'ch', 'q', 'xh'],
    'm': ['m'],
    'n': ['n'],
    'ŋ': ['ng', 'n'],
    'p': ['p', 'pp'],
    'r': ['r', 'rr'],
    's': ['s', 'ss', 'ce', ''],
    'ʃ': ['sh', 'ch', 'ss', 't', ''],
    'tʃ': ['ch', 'tch'],
    'θ': ['th'],
    'ð': ['th'],
    'v': ['v'],
    'w': ['w', 'u'],
    'z': ['z', 'x', 's', 'si'],
    'ʒ': ['zh', 'j', 's',],
    'd͡ʒ': ['j', 'g', 'ge', 'dge'],
    'ː': [''],
    'ɡ': ['g', 'gg', ''],
    '(': [''],
    ')': [''],
    'ɔ': ['o', 'a', 'ou'],
    'ɚ': ['ar', 'er'],
    'ɘ': ['e', 'a', 'o'],
    'ɵ': ['ir'],
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

  function extractDefinition(data) {
    let definition = data[0].meanings[0].definitions[0].definition;
    console.log("definition : " + definition);
    return definition;
  }


  function getPhoneme(word, callback) {
    const Http = new XMLHttpRequest();
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/{}".replace('{}', word);
    Http.open("GET", url);
    Http.send();
    Http.responseType = "json";
    Http.onload = () => {
      if (Http.readyState === 4 && Http.status === 200) {
        const data = Http.response;
        let extractedPhoneme = extractPhoneme(data);
        let extractedDefinition = extractDefinition(data);
        setDefinition((definition) => extractedDefinition);
        //console.log("extracted : " + extractedPhoneme);
        callback(extractedPhoneme);
      }
    };
  }
  let stress = -2;
  let wordFinished = false;

  function findtheStress(word) {
    //console.log("findtheStress");
    //console.log("word : " + word);

    const phoneme = getPhoneme(word, (phoneme) => {
      //console.log("pho " + phoneme);
      let index = 1;
      let finalWord = "";

      function findRecursiveStress(phoneme, index, wordToFind, finalWord) {

        if (wordFinished === true) {
          return;
        }

        //console.log("----------------------------------------------------");
        //console.log("findRecursiveStress");
        //console.log("phoneme[index] : " + phoneme[index]);
        //console.log("finalWord : " + finalWord);
        //console.log("stress : " + stress);
        //console.log("wordFinished : " + wordFinished);
        //console.log("---------------------");
        if (phoneme[index] === "/") {

          if (stress === -2) {
            stress = -1;
          }
          wordFinished = true;
          //console.log("stress non trouvé " + stress);
          return;
        }
        if (phoneme[index] === "ˈ") {
          //console.log("stress trouvé");
          //console.log("index : " + index);
          //console.log("finalWord" + finalWord);
          if (finalWord.length > stress) {
            stress = finalWord.length;
          }
        }

        for (let i = 0; i < phonemedictionnary[phoneme[index]].length; i++) {
          if (wordFinished === true) {
            break;
          }
          //console.log("boucle, index : " + index + ", phoneme : " + phoneme[index] + " traduction du phoeneme : " + phonemedictionnary[phoneme[index]][i]);
          let previousfinalWord = finalWord;
          finalWord = finalWord + phonemedictionnary[phoneme[index]][i]
          //console.log("finalWord : " + finalWord);

          //if finalWord is not the same as beginning of wordToFind then don't recall the function
          if (wordToFind.startsWith(finalWord)) {
            //console.log("Ca commence bien ");
            findRecursiveStress(phoneme, index + 1, wordToFind, finalWord);
          }
          finalWord = previousfinalWord;


        }

      }

      if (phoneme.includes("ˈ")) {
        //console.log("wordToFind : " + word);
        findRecursiveStress(phoneme, index, word, finalWord);
      }


      //console.log("-----------------------------------------------------------------------");
      //console.log("final stress : " + (stress));
      setFinalStress((finalStress) => stress);
      updateStress(stress);
      return;
      //callback(); //TODO ?
    });

  }





  useEffect(() => {
    findtheStress(chosenWord);
    console.log("finalStress : " + finalStress);
  }, [chosenWord]);



  return (
    <div className="word">

      <div className="wordcontainer">
        {chosenWord.split("").map((letter, index) => (
          <Letter key={index} index={index} lettre={letter} stress={finalStress} updatePoints={updatePoints} oskur={oskur} oskur2={oskur2} />

        ))}
      </div>
      <p class="definition">{definition}</p>

    </div>
  );
};

export default Word;
