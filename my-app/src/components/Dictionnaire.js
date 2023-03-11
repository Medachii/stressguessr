import React, { useEffect, useState } from "react";
import ListeMots from "./ListeMots";
import mots from "../dictionary.json";
import "./dictionary.css";

function readAudio(link) {
  console.log("Coucou voici le lien : " + link);
  var audio = new Audio(link);
  audio.play();
}

function Dictionnaire() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(mots);
  }, []);

  return (
    <div>
      <h1>Phoneme dictionary</h1>


        <h3>General</h3>

      <p>
        Phonemes are the basic blocs for the phonetic writing of a word. Here is
        a list of the most important ones, with a word that is pronounced using
        them, and the pronunciation of that word. You can hear the word by
        pressing the button on the right.
      </p>
      <p>
        Phonemes have different transcriptions in "normal writing". Those
        differents ways of writing them are called graphemes.
      </p>

        <h3>Inaudible phonemes</h3>

      <p>
        Some phonemes don't actually make sounds, but modify the sound that come
        after them. Here are the most important :
        <ul>
          <li>
            ˈ : signifies the presence of a stress in the word, on the letter that follows it.
            <p>Here is an example to differentiate :</p>
            <ul>
              <li>
                {" "}
                Present (noun) :{" "}
                <button
                  onClick={() =>
                    readAudio(
                      "https://api.dictionaryapi.dev/media/pronunciations/en/present-us-adjective-noun.mp3"
                    )
                  }
                >
                  /ˈpɹɛzənt/
                </button>
              </li>
                  
              <li>
                {" "}
                Present (verb) :{" "}
                <button
                  onClick={() =>
                    readAudio(require("../sound/téléchargement.mp3"))
                  }
                >
                  /pɹəˈzɛnt/
                </button>
              </li>
            </ul>
          </li>
          <br></br>
          <li>
            ː : makes the sound that comes before longer.
            <p>Here is an example to differentiate :</p>
            <ul>
              <li>
                Teen :
                <button
                  onClick={() =>
                    readAudio(
                      "https://api.dictionaryapi.dev/media/pronunciations/en/teen-us.mp3"
                    )
                  }
                >
                  /tiːn/
                </button>
              </li>
              <li>
                Tin :
                <button
                  onClick={() =>
                    readAudio(
                      "https://api.dictionaryapi.dev/media/pronunciations/en/tin-us.mp3"
                    )
                  }
                >
                  /tɪn/
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </p>

        <br></br>
        

      {entries ? <ListeMots entries={entries} /> : <p>Loading dictionary...</p>}
    </div>
  );
}

export default Dictionnaire;
