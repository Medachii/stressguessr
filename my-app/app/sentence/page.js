"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "/app/components/Navbar";
import { fetchEntry, WordNotFoundError } from "/app/api/dictionary.js";
import { stressReadings } from "/app/lib/stress.js";
import { useTranslation } from "/app/lib/i18n";
import Definition from "/app/components/Definition";

const MAX_WORDS = 80;
const PARALLEL_REQUESTS = 4;
const TYPING_DELAY = 600;
const STORAGE_KEY = "stressguessr.sentence";
const EXAMPLE = "I will present my photography project to the committee and record the results.";

// Words (with inner apostrophes or hyphens) at odd positions, everything else at even ones
const WORD_PATTERN = /([A-Za-z]+(?:['’-][A-Za-z]+)*)/;

function lookupKey(token) {
  return token.toLowerCase().replace(/’/g, "'");
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function searchLink(token) {
  return "/search?word=" + encodeURIComponent(lookupKey(token)) + "&from=sentence";
}

function readingLabel(reading, t, pos) {
  return reading.partsOfSpeech.length ? capitalize(reading.partsOfSpeech.map(pos).join(" / ")) : t("sentence.otherMeaning");
}

function describe(result, t, pos) {
  if (!result || result.state === "loading") {
    return t("sentence.looking");
  }
  if (result.state === "notfound") {
    return t("sentence.notFound");
  }
  if (result.state === "error") {
    return t("sentence.unavailable");
  }
  return result.readings.map((r) => readingLabel(r, t, pos) + ": " + r.phonetic).join("\n");
}

// The word with its stressed letter highlighted
function MarkedWord({ token, index }) {
  if (index < 0) {
    return token;
  }
  return (
    <>
      {token.slice(0, index)}
      <span className="sw-mark">{token[index]}</span>
      {token.slice(index + 1)}
    </>
  );
}

function SentenceWord({ token, result, choice, active, onSelect }) {
  const { t, pos } = useTranslation();
  if (!result || result.state !== "found") {
    const className = "sw " + (!result || result.state === "loading" ? "sw-loading" : "sw-unknown");
    return <Link href={searchLink(token)} className={className} title={describe(result, t, pos)}>{token}</Link>;
  }

  const reading = result.readings[choice] || result.readings[0];
  const index = reading.status === "stressed" ? reading.index : -1;

  // Words with several meanings open a choice instead of the detail page
  if (result.readings.length > 1) {
    let className = "sw " + (choice === undefined ? "sw-ambiguous" : "sw-chosen");
    if (active) {
      className += " sw-active";
    }
    return (
      <button type="button" className={className} title={describe(result, t, pos)} onClick={onSelect} aria-expanded={active}>
        <MarkedWord token={token} index={index} />
      </button>
    );
  }

  const className = "sw" + (reading.status === "unknown" ? " sw-unknown" : "");
  return (
    <Link href={searchLink(token)} className={className} title={describe(result, t, pos)}>
      <MarkedWord token={token} index={index} />
    </Link>
  );
}

function MeaningPicker({ token, result, choice, onChoose, onClose }) {
  const { t, pos } = useTranslation();
  return (
    <div className="meaning-picker">
      <div className="meaning-header">
        <span>{t("sentence.which", token)}</span>
        <button type="button" className="meaning-close" onClick={onClose} aria-label={t("close")}>×</button>
      </div>
      <div className="meaning-options">
        {result.readings.map((reading, i) => (
          <button
            key={i}
            type="button"
            className={"meaning-option" + ((choice ?? -1) === i ? " selected" : "")}
            onClick={() => onChoose(i)}
          >
            <span className="meaning-label">{readingLabel(reading, t, pos)}</span>
            <span className="meaning-word">
              <MarkedWord token={token} index={reading.status === "stressed" ? reading.index : -1} />
            </span>
            <span className="meaning-phonetic">{reading.phonetic}</span>
            <Definition
              word={lookupKey(token)}
              partsOfSpeech={reading.partsOfSpeech}
              english={reading.definition}
              className="meaning-gloss"
              showSource={false}
            />
          </button>
        ))}
      </div>
      <Link href={searchLink(token)} className="meaning-details">{t("sentence.details")}</Link>
    </div>
  );
}

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch (error) {
    return null;
  }
}

export default function Sentence() {
  const { t } = useTranslation();
  const [text, setText] = useState(EXAMPLE);
  const [analyzedText, setAnalyzedText] = useState("");
  const [results, setResults] = useState({});
  // Chosen meaning for ambiguous words, by occurrence ("present#1" = first "present")
  const [choices, setChoices] = useState({});
  const [activeWord, setActiveWord] = useState(null);
  const [restored, setRestored] = useState(false);
  const requested = useRef(new Set());

  // Gives back the sentence written before visiting another page
  useEffect(() => {
    const saved = loadSaved();
    if (saved && typeof saved.text === "string") {
      setText(saved.text);
      setAnalyzedText(saved.text);
      setChoices(saved.choices || {});
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ text, choices }));
    } catch (error) {
      // Private browsing or storage disabled: the sentence simply is not remembered
    }
  }, [text, choices, restored]);

  // Live analysis once the user stops typing for a moment
  useEffect(() => {
    const timer = setTimeout(() => setAnalyzedText(text), TYPING_DELAY);
    return () => clearTimeout(timer);
  }, [text]);

  const tokens = analyzedText.split(WORD_PATTERN);
  const words = tokens.filter((_, i) => i % 2 === 1);
  const tooLong = words.length > MAX_WORDS;

  useEffect(() => {
    const keys = [...new Set(analyzedText.split(WORD_PATTERN).filter((_, i) => i % 2 === 1).slice(0, MAX_WORDS).map(lookupKey))]
      .filter((key) => !requested.current.has(key));
    if (keys.length === 0) {
      return;
    }
    keys.forEach((key) => requested.current.add(key));
    setResults((previous) => {
      const next = { ...previous };
      keys.forEach((key) => { next[key] = { state: "loading" }; });
      return next;
    });

    // A few requests at a time to stay gentle with the dictionary service
    const queue = [...keys];
    async function worker() {
      while (queue.length > 0) {
        const key = queue.shift();
        let result;
        try {
          const entry = await fetchEntry(key);
          result = { state: "found", readings: stressReadings(key, entry) };
        } catch (error) {
          result = { state: error instanceof WordNotFoundError ? "notfound" : "error" };
          if (result.state === "error") {
            requested.current.delete(key);
          }
        }
        setResults((previous) => ({ ...previous, [key]: result }));
      }
    }
    for (let i = 0; i < PARALLEL_REQUESTS; i++) {
      worker();
    }
  }, [analyzedText]);

  function choose(occurrence, readingIndex) {
    setChoices((previous) => ({ ...previous, [occurrence]: readingIndex }));
    setActiveWord(null);
  }

  // Builds the highlighted sentence and remembers which word the picker belongs to
  const seen = {};
  let wordCount = 0;
  let activeToken = null;
  const output = tokens.map((token, i) => {
    if (i % 2 === 0) {
      return token;
    }
    wordCount++;
    if (wordCount > MAX_WORDS) {
      return token;
    }
    const key = lookupKey(token);
    seen[key] = (seen[key] || 0) + 1;
    const occurrence = key + "#" + seen[key];
    if (occurrence === activeWord) {
      activeToken = token;
    }
    return (
      <SentenceWord
        key={i}
        token={token}
        result={results[key]}
        choice={choices[occurrence]}
        active={occurrence === activeWord}
        onSelect={() => setActiveWord(occurrence === activeWord ? null : occurrence)}
      />
    );
  });

  const activeResult = activeToken !== null ? results[lookupKey(activeToken)] : null;
  const ambiguousLeft = Object.keys(seen).some((key) => {
    const result = results[key];
    if (!result || result.state !== "found" || result.readings.length < 2) {
      return false;
    }
    for (let n = 1; n <= seen[key]; n++) {
      if (choices[key + "#" + n] === undefined) {
        return true;
      }
    }
    return false;
  });

  return (
    <main>
      <Navbar />
      <div className="page narrow">
        <h1>{t("sentence.title")}</h1>
        <p className="muted">{t("sentence.intro")}</p>

        <div className="sentence-grid">
          <div className="card sentence-panel">
            <label className="panel-label" htmlFor="sentence-input">{t("sentence.yourText")}</label>
            <textarea
              id="sentence-input"
              className="text-input sentence-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("sentence.placeholder")}
              spellCheck="false"
            />
            <div className="panel-footer">
              <span className={"muted small" + (tooLong ? " warning" : "")}>
                {t("sentence.words", words.length, MAX_WORDS)}
              </span>
              {text && (
                <button type="button" className="btn btn-ghost btn-small" onClick={() => { setText(""); setChoices({}); setActiveWord(null); }}>
                  {t("sentence.clear")}
                </button>
              )}
            </div>
          </div>

          <div className="card sentence-panel">
            <span className="panel-label">{t("sentence.stress")}</span>
            <div className="sentence-output">{output}</div>
            {tooLong && <p className="muted small warning">{t("sentence.tooLong", MAX_WORDS)}</p>}
            {activeResult && activeResult.state === "found" && (
              <MeaningPicker
                token={activeToken}
                result={activeResult}
                choice={choices[activeWord]}
                onChoose={(i) => choose(activeWord, i)}
                onClose={() => setActiveWord(null)}
              />
            )}
            {!activeResult && ambiguousLeft && (
              <p className="muted small hint">{t("sentence.hint")}</p>
            )}
          </div>
        </div>

        <div className="legend">
          <span><span className="sw"><span className="sw-mark">a</span></span> {t("sentence.legend.stressed")}</span>
          <span><span className="sw sw-ambiguous">word</span> {t("sentence.legend.ambiguous")}</span>
          <span><span className="sw sw-chosen">word</span> {t("sentence.legend.chosen")}</span>
          <span><span className="sw sw-unknown">word</span> {t("sentence.legend.unknown")}</span>
        </div>

        <p className="notice">{t("sentence.notice")}</p>
      </div>
    </main>
  );
}
