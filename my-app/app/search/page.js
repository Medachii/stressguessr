"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "/app/components/Navbar";
import StressTiles from "/app/components/StressTiles";
import { SpeakerIcon } from "/app/components/ListeMots";
import { fetchEntry, fetchAudioUrl, playAudio, WordNotFoundError } from "/app/api/dictionary.js";
import { stressReadings } from "/app/lib/stress.js";

function readingLabel(reading) {
  if (!reading.partsOfSpeech.length) {
    return "";
  }
  const label = reading.partsOfSpeech.join(" / ");
  return (/^[aeiou]/i.test(label) ? "As an " : "As a ") + label;
}

function StatusText({ word, reading }) {
  if (reading.status === "stressed") {
    return <p className="muted">The stress falls on the syllable starting with <strong>{word[reading.index]}</strong>.</p>;
  }
  if (reading.status === "none") {
    return <p className="muted">No stress mark: this word has a single syllable.</p>;
  }
  return <p className="muted">We could not match the stress to the spelling. In the phonetic writing, the stressed syllable comes right after the <strong>ˈ</strong> mark.</p>;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [word, setWord] = useState("");
  const [readings, setReadings] = useState([]);
  const [audio, setAudio] = useState("");
  const [state, setState] = useState("idle");
  const [fromSentence, setFromSentence] = useState(false);
  const currentSearch = useRef("");
  const fromSentenceRef = useRef(false);

  async function search(text) {
    const cleaned = text.trim().toLowerCase().replace(/’/g, "'");
    if (!cleaned) {
      return;
    }
    currentSearch.current = cleaned;
    setWord(cleaned);
    setState("loading");
    setAudio("");
    window.history.replaceState(null, "", "/search?word=" + encodeURIComponent(cleaned) + (fromSentenceRef.current ? "&from=sentence" : ""));

    try {
      const entry = await fetchEntry(cleaned);
      if (currentSearch.current !== cleaned) {
        return;
      }
      setReadings(stressReadings(cleaned, entry));
      setState("found");
      fetchAudioUrl(cleaned).then((url) => {
        if (currentSearch.current === cleaned) {
          setAudio(url);
        }
      });
    } catch (error) {
      if (currentSearch.current === cleaned) {
        setState(error instanceof WordNotFoundError ? "notfound" : "error");
      }
    }
  }

  // Words can be opened directly with /search?word=... (and &from=sentence when coming from the sentence page)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    fromSentenceRef.current = params.get("from") === "sentence";
    setFromSentence(fromSentenceRef.current);
    const initial = params.get("word");
    if (initial) {
      setQuery(initial);
      search(initial);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    search(query);
  }

  const ambiguous = readings.length > 1;

  return (
    <main>
      <Navbar />
      <div className="page narrow">
        {fromSentence && <Link href="/sentence" className="back-link">← Back to your sentence</Link>}
        <h1>Word <span className="gradient-text">lookup</span></h1>
        <p className="muted">Type an English word to see where its stress falls, what it means and how it sounds.</p>

        <form className="search-bar" onSubmit={handleSubmit}>
          <input
            className="text-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. photography"
            aria-label="Word to look up"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        {state === "loading" && <p className="muted center-text">Looking up &ldquo;{word}&rdquo;…</p>}

        {state === "notfound" && (
          <section className="card word-card">
            <p>We couldn&apos;t find &ldquo;{word}&rdquo; in the dictionary.</p>
            <p className="muted">Check the spelling, or try the base form of the word (e.g. &ldquo;run&rdquo; instead of &ldquo;ran&rdquo;).</p>
          </section>
        )}

        {state === "error" && (
          <section className="card word-card">
            <p>The dictionary service is not responding right now. Please try again in a moment.</p>
          </section>
        )}

        {state === "found" && (
          <section className="card word-card">
            {ambiguous && (
              <p className="notice">This word is stressed differently depending on its meaning.</p>
            )}

            {readings.map((reading, i) => (
              <div key={i} className={ambiguous ? "reading" : ""}>
                {ambiguous && <p className="reading-label">{readingLabel(reading)}</p>}
                <StressTiles word={word} index={reading.index} />
                <p className="phonetic">{reading.phonetic}</p>
                {!ambiguous && <StatusText word={word} reading={reading} />}
                {reading.definition && <p className="definition">{reading.definition}</p>}
              </div>
            ))}

            {audio && (
              <div className="pronunciation">
                <button type="button" className="phonetic-chip" onClick={() => playAudio(audio)}>
                  <SpeakerIcon /> Listen
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
