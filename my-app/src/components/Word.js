import React from "react";
import Letter from "./Letter";

const Word = ({chosenWord}) => {

  return (
    <div className="word">
      <h2>
        {chosenWord.split("").map((letter, index) => (
          <Letter key={index} lettre={letter} />
        ))}
      </h2>
    </div>
  );
};

export default Word;
