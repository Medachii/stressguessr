"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import translations, { partsOfSpeech } from "./translations";

const STORAGE_KEY = "stressguessr.lang";
export const LANGUAGES = ["en", "fr"];

const LanguageContext = createContext({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  // Saved choice first, otherwise the browser language
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      // Storage disabled: the choice is simply not remembered
    }
    if (LANGUAGES.includes(saved)) {
      setLangState(saved);
    } else if (navigator.language && navigator.language.toLowerCase().startsWith("fr")) {
      setLangState("fr");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      // Storage disabled: the choice is simply not remembered
    }
  }, []);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

// t("key") returns the text in the current language (English when a translation is missing).
// Some texts are functions taking parameters, like t("search.loading", word).
export function useTranslation() {
  const { lang, setLang } = useContext(LanguageContext);

  const t = useCallback((key, ...params) => {
    const value = translations[lang][key] ?? translations.en[key];
    if (value === undefined) {
      return key;
    }
    return typeof value === "function" ? value(...params) : value;
  }, [lang]);

  // Parts of speech coming from the dictionary ("noun", "verb"...)
  const pos = useCallback((name) => (lang === "en" ? name : partsOfSpeech[lang][name] || name), [lang]);

  return { lang, setLang, t, pos };
}
