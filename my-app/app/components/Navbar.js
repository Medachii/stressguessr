"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/game", label: "Game" },
    { href: "/dictionary", label: "Dictionary" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link className="brand" href="/">
                    <span className="brand-logo">ˈ</span>
                    <span>StressGuessr</span>
                </Link>
                <ul className="nav-links">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                className={"nav-link" + (pathname === link.href ? " active" : "")}
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
