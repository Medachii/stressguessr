"use client";

import React from "react";
import Link from "next/link";
import "/public/index.css";

class Navbar extends React.Component {
    
    render() {
        
        return (
            <div className="navbar">
                <nav>
                <ul>
                    <li>
                    <Link href="/">Home</Link>
                    </li>
                    <li>
                    <Link href="/game">Game</Link>
                    </li>
                    <li>
                    <Link href="/dictionary">Dictionary</Link>
                    </li>
                </ul>
                </nav>
            </div>
            
        );
    }
}

export default Navbar;
