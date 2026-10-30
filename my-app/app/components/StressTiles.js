import React from "react";

// Shows a word as letter tiles, like in the game, with the stressed letter highlighted
export default function StressTiles({ word, index }) {
  return (
    <div className="wordcontainer" aria-label={word}>
      {word.split("").map((letter, i) => (
        <span key={i} className={"letter static" + (i === index ? " stressed" : "")}>
          {letter}
        </span>
      ))}
    </div>
  );
}
