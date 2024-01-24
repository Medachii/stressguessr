"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ListeMots from "/app/components/ListeMots";
import mots from "../dictionary.json";
import "/app/components/dictionary.css";
import "/public/index.css";
import Navbar from "/app/components/Navbar";






export default function Dictionary() {

    function readAudio(link) {
    //console.log("Coucou voici le lien : " + link);
    var audio = new Audio(link);
    audio.play();
    }


    const [entries, setEntries] = useState([]);

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        setEntries(mots);
    }, []);

    return (
        <main className="window">
        <Navbar/>
        <div className="dictionary">
           
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
            </p>
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
                            console.log("coucou")

                        }
                        >
                        /pɹəˈzɛnt/
                        </button>
                    </li>
                    </ul>
                </li>
                {/* readAudio(require("../sound/téléchargement.mp3")) */}
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
          

                <br></br>
                

            {entries ? <ListeMots entries={entries} /> : <p>Loading dictionary...</p>}
            </div>
        </main>
        );
    };

