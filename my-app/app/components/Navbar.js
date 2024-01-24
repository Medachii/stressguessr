

import React from "react";
import Link from "next/link";
import "/public/index.css";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


class Navbar extends React.Component {
    
    render() {
        return (
           
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                <Link className="navbar-brand nav-link" href="/">StressGuessr</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link"  href="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/game">Game</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/dictionary">Dictionary</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            
        );
    }
}

export default Navbar;
