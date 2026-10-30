"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "/app/components/Navbar";
import StressTiles from "/app/components/StressTiles";
import { SpeakerIcon } from "/app/components/ListeMots";
import { fetchEntry, fetchAudioUrl, playAudio, WordNotFoundError } from "/app/api/dictionary.js";
import { stressReadings } from "/app/lib/stress.js";
import { useTranslation } from "/app/lib/i18n";
import Definition from "/app/components/Definition";

function StatusText({ word, reading }) {
  const { t } = useTranslation();
  if (reading.status === "stressed") {
    return <p className="muted">{t("search.stressed", word[reading.index])}</p>;
  }
  if (reading.status === "none") {
    return <p className="muted">{t("search.none")}</p>;
  }
  return <p className="muted">{t("search.unknown")}</p>;
}

export default function Search() {
  const { t, pos } = useTranslation();
  const [query, setQuery] = useState("");
  const [entryPos, setEntryPos] = useState("");
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
      setEntryPos(entry.partOfSpeech);
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

  function readingLabel(reading) {
    return reading.partsOfSpeech.length ? t("search.as", reading.partsOfSpeech.map(pos).join(" / ")) : "";
  }

  return (
    <main>
      <Navbar />
      <div className="page narrow">
        {fromSentence && <Link href="/sentence" className="back-link">{t("search.back")}</Link>}
        <h1>{t("search.title")}</h1>
        <p className="muted">{t("search.intro")}</p>

        <form className="search-bar" onSubmit={handleSubmit}>
          <input
            className="text-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            aria-label={t("search.inputLabel")}
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
          <button type="submit" className="btn btn-primary">{t("search.button")}</button>
        </form>

        {state === "loading" && <p className="muted center-text">{t("search.loading", word)}</p>}

        {state === "notfound" && (
          <section className="card word-card">
            <p>{t("search.notFound", word)}</p>
            <p className="muted">{t("search.notFoundHint")}</p>
          </section>
        )}

        {state === "error" && (
          <section className="card word-card">
            <p>{t("search.error")}</p>
          </section>
        )}

        {state === "found" && (
          <section className="card word-card">
            {ambiguous && (
              <p className="notice">{t("search.ambiguous")}</p>
            )}

            {readings.map((reading, i) => (
              <div key={i} className={ambiguous ? "reading" : ""}>
                {ambiguous && <p className="reading-label">{readingLabel(reading)}</p>}
                <StressTiles word={word} index={reading.index} />
                <p className="phonetic">{reading.phonetic}</p>
                {!ambiguous && <StatusText word={word} reading={reading} />}
                <Definition
                  word={word}
                  partsOfSpeech={reading.partsOfSpeech.length ? reading.partsOfSpeech : [entryPos]}
                  english={reading.definition}
                />
              </div>
            ))}

            {audio && (
              <div className="pronunciation">
                <button type="button" className="phonetic-chip" onClick={() => playAudio(audio)}>
                  <SpeakerIcon /> {t("listen")}
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
