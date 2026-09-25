"use client";

import Link from "next/link";
import React from "react";
import Navbar from "/app/components/Navbar.js";

export default function Base() {
  return (
      <main>
        <Navbar/>

        <div className="page">
            <section className="hero">
                <h1>Master the <span className="gradient-text">stress</span> of English words</h1>
                <p className="hero-lead">
                    stressguessr is a game that is made to teach you how to pronounce the words of the English language!
                    Guess which syllable carries the stress, and train your ear along the way.
                </p>
                <div className="hero-actions">
                    <Link className="btn btn-primary" href="/game">Play now →</Link>
                    <Link className="btn btn-ghost" href="/dictionary">Phoneme dictionary</Link>
                </div>
            </section>

            <section className="feature-grid">
                <div className="card feature">
                    <div className="feature-icon">📚</div>
                    <h3>Oxford 3000</h3>
                    <p>We use words from the <Link href='https://www.oxfordlearnersdictionaries.com/wordlist/american_english/oxford3000/' target="_blank">Oxford 3000</Link> dictionary, which contains 3000 of the most used words in the English language.</p>
                </div>
                <div className="card feature">
                    <div className="feature-icon">🔊</div>
                    <h3>Real pronunciations</h3>
                    <p>We use the <Link href='https://dictionaryapi.dev/' target="_blank">Dictionary API</Link> to get the information (phonetics, definition, audio...) of our words.</p>
                </div>
                <div className="card feature">
                    <div className="feature-icon">🧠</div>
                    <h3>Our own algorithm</h3>
                    <p>The <Link href='/game'>game</Link> is powered by our own phonetics-to-written-language translation algorithm, and the <Link href='/dictionary'>dictionary</Link> explains how to read phonetic writing.</p>
                </div>
            </section>

            <p className="credits">
                Created by <Link href='https://github.com/Medachii' target="_blank">Noé-Laurent Laurent</Link> and <Link href='https://github.com/numieow' target="_blank">Maxime Wirth</Link>
            </p>
        </div>
      </main>
  );
}
