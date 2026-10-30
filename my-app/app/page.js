"use client";

import Link from "next/link";
import React from "react";
import Navbar from "/app/components/Navbar.js";
import { useTranslation } from "/app/lib/i18n";

export default function Base() {
  const { t } = useTranslation();

  return (
      <main>
        <Navbar/>

        <div className="page">
            <section className="hero">
                <h1>{t("home.title")}</h1>
                <p className="hero-lead">{t("home.lead")}</p>
                <div className="hero-actions">
                    <Link className="btn btn-primary" href="/game">{t("home.play")}</Link>
                    <Link className="btn btn-ghost" href="/dictionary">{t("home.dictionary")}</Link>
                </div>
            </section>

            <section className="feature-grid">
                <div className="card feature">
                    <div className="feature-icon">📚</div>
                    <h3>{t("home.oxford.title")}</h3>
                    <p>{t("home.oxford.text")}</p>
                </div>
                <div className="card feature">
                    <div className="feature-icon">🔊</div>
                    <h3>{t("home.audio.title")}</h3>
                    <p>{t("home.audio.text")}</p>
                </div>
                <div className="card feature">
                    <div className="feature-icon">🧠</div>
                    <h3>{t("home.algo.title")}</h3>
                    <p>{t("home.algo.text")}</p>
                </div>
            </section>

            <p className="credits">{t("home.credits")}</p>
        </div>
      </main>
  );
}
