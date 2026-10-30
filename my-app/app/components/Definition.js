"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "/app/lib/i18n";
import { fetchFrenchDefinition } from "/app/api/french.js";

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Shows the English definition, or its French meaning when the site is in French
export default function Definition({ word, partsOfSpeech, english, className = "definition", showSource = true }) {
  const { lang, t, pos } = useTranslation();
  const [french, setFrench] = useState(null);
  const posKey = (partsOfSpeech || []).join(",");

  useEffect(() => {
    setFrench(null);
    if (lang !== "fr" || !word) {
      return;
    }
    let cancelled = false;
    fetchFrenchDefinition(word, partsOfSpeech, english).then((result) => {
      if (!cancelled) {
        setFrench(result);
      }
    });
    return () => { cancelled = true; };
    // partsOfSpeech is compared through posKey to avoid refetching on every render
  }, [lang, word, posKey, english]);

  if (lang !== "fr") {
    return english ? <p className={className}>{english}</p> : null;
  }
  if (french === null) {
    return <p className={className + " muted"}>{t("def.loading")}</p>;
  }
  if (!french.parts.length) {
    return null;
  }
  // Several parts of speech (e.g. adjective and noun): one line each, with its label
  const labelled = french.parts.length > 1;
  return (
    <p className={className}>
      {french.parts.map((part, i) => (
        <span key={i} className={labelled ? "definition-part" : ""}>
          {labelled && <span className="definition-pos">{capitalize(pos(part.pos))} : </span>}
          {part.text}
        </span>
      ))}
      {showSource && french.source !== "english" && (
        <span className="definition-source">{french.source === "wiktionary" ? t("def.wiktionary") : t("def.machine")}</span>
      )}
    </p>
  );
}
