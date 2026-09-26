"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ListeMots, { SpeakerIcon } from "/app/components/ListeMots";
import mots from "../dictionary.json";
import Navbar from "/app/components/Navbar";
import { audioFileUrl, playAudio } from "/app/api/dictionary.js";



export default function Dictionary() {

    function readAudio(file) {
        playAudio(audioFileUrl(file));
    }


    const [entries, setEntries] = useState([]);

    useEffect(() => {
        setEntries(mots);
    }, []);

    return (
        <main>
        <Navbar/>
        <div className="page">

            <h1>Phoneme <span className="gradient-text">dictionary</span></h1>

            <section className="card section">
                <h2>General</h2>
                <p>
                    Phonemes are the basic blocs for the phonetic writing of a word. Here is
                    a list of the most important ones, with a word that is pronounced using
                    them, and the pronunciation of that word. You can hear the word by
                    pressing the button on the right.
                </p>
                <p style={{ marginBottom: 0 }}>
                    Phonemes have different transcriptions in &quot;normal writing&quot;. Those
                    differents ways of writing them are called graphemes.
                </p>
            </section>

            <section className="card section">
                <h2>Inaudible phonemes</h2>
                <p>
                    Some phonemes don&apos;t actually make sounds, but modify the sound that come
                    after them. Here are the most important:
                </p>

                <div className="inaudible">
                    <p><span className="symbol">ˈ</span>signifies the presence of a stress in the word, on the letter that follows it.</p>
                    <ul className="example-list">
                        <li>
                            <button
                            className="phonetic-chip"
                            onClick={() =>
                                readAudio(
                                "en-us-present-adjective.ogg"
                                )
                            }
                            >
                            <SpeakerIcon /> Present <span>(noun)</span> /ˈpɹɛzənt/
                            </button>
                        </li>
                        <li>
                            <button
                            className="phonetic-chip"
                            onClick={() =>
                                readAudio("en-us-present-verb1.ogg")
                            }
                            >
                            <SpeakerIcon /> Present <span>(verb)</span> /pɹəˈzɛnt/
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="inaudible">
                    <p><span className="symbol">ː</span>makes the sound that comes before longer.</p>
                    <ul className="example-list">
                        <li>
                            <button
                            className="phonetic-chip"
                            onClick={() =>
                                readAudio(
                                "en-us-teen.ogg"
                                )
                            }
                            >
                            <SpeakerIcon /> Teen /tiːn/
                            </button>
                        </li>
                        <li>
                            <button
                            className="phonetic-chip"
                            onClick={() =>
                                readAudio(
                                "en-us-tin.ogg"
                                )
                            }
                            >
                            <SpeakerIcon /> Tin /tɪn/
                            </button>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="card section">
                <h2>Phonemes</h2>
                {entries ? <ListeMots entries={entries} /> : <p>Loading dictionary...</p>}
            </section>
            </div>
        </main>
        );
    };
