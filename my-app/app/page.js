"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "/app/components/NavBar.js";
import "/public/index.css";
import { useEffect } from "react";





export default function Base() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
      <main className="window" >
        <Navbar/>

        <div className="container-lg mt-3" >
            <h1>Home</h1>

            <p>Welcome to stressguessr !</p>
            <p>stressguessr is a game that is made to teach you how to pronounce the words of the English language ! We use word from the <Link href='https://www.oxfordlearnersdictionaries.com/wordlist/american_english/oxford3000/' target="_blank">Oxford 3000</Link> dictionary, which contains 3000 of the most used word in the English language.</p>
            <p>We also use the <Link href='https://dictionaryapi.dev/' target="_blank">Dictionary API</Link>, to get the information (phonetics, definition...) of our words.</p>

            <p>On this website, you can find a <Link href='/dictionary'>dictionary</Link> that explains a bit of how to read the phonetic writing of words, and the true <Link href='/game'>game</Link> part, powered by our own phonetics-written language translation algorithm.</p>
        
            <p>Created by <Link href='https://github.com/Medachii' target="_blank">Noé-Laurent Laurent</Link> and <Link href='https://github.com/numieow' target="_blank">Maxime Wirth</Link></p>
        </div>
      </main>

    
  );
}
