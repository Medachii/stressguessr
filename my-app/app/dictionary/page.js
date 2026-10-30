"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ListeMots, { SpeakerIcon } from "/app/components/ListeMots";
import mots from "../dictionary.json";
import Navbar from "/app/components/Navbar";
import { audioFileUrl, playAudio } from "/app/api/dictionary.js";
import { useTranslation } from "/app/lib/i18n";



export default function Dictionary() {
    const { t } = useTranslation();

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

            <h1>{t("dictionary.title")}</h1>

            <section className="card section">
                <h2>{t("dictionary.general")}</h2>
                <p>{t("dictionary.general1")}</p>
                <p style={{ marginBottom: 0 }}>{t("dictionary.general2")}</p>
            </section>

            <section className="card section">
                <h2>{t("dictionary.inaudible")}</h2>
                <p>{t("dictionary.inaudibleIntro")}</p>

                <div className="inaudible">
                    <p><span className="symbol">ˈ</span>{t("dictionary.stressMark")}</p>
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
                            <SpeakerIcon /> Present <span>{t("dictionary.noun")}</span> /ˈpɹɛzənt/
                            </button>
                        </li>
                        <li>
                            <button
                            className="phonetic-chip"
                            onClick={() =>
                                readAudio("en-us-present-verb1.ogg")
                            }
                            >
                            <SpeakerIcon /> Present <span>{t("dictionary.verb")}</span> /pɹəˈzɛnt/
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="inaudible">
                    <p><span className="symbol">ː</span>{t("dictionary.longMark")}</p>
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
                <h2>{t("dictionary.phonemes")}</h2>
                {entries ? <ListeMots entries={entries} /> : <p>{t("dictionary.loading")}</p>}
            </section>
            </div>
        </main>
        );
    };
