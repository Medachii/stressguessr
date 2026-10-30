"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGUAGES, useTranslation } from "/app/lib/i18n";

const links = [
    { href: "/", key: "nav.home" },
    { href: "/game", key: "nav.game" },
    { href: "/search", key: "nav.search" },
    { href: "/sentence", key: "nav.sentence" },
    { href: "/dictionary", key: "nav.dictionary" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { lang, setLang, t } = useTranslation();

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link className="brand" href="/">
                    <span className="brand-logo">ˈ</span>
                    <span>StressGuessr</span>
                </Link>
                <div className="lang-toggle" role="group" aria-label={t("nav.language")}>
                    {LANGUAGES.map((code) => (
                        <button
                            key={code}
                            type="button"
                            className={"lang-option" + (lang === code ? " active" : "")}
                            onClick={() => setLang(code)}
                            aria-pressed={lang === code}
                        >
                            {code.toUpperCase()}
                        </button>
                    ))}
                </div>
                <ul className="nav-links">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                className={"nav-link" + (pathname === link.href ? " active" : "")}
                                href={link.href}
                            >
                                {t(link.key)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
