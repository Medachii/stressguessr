import React from "react";
import Letter from "./Letter";

const Word = ({chosenWord}) => {

  console.log("Un mot est bien créé !" + JSON.stringify(chosenWord));

  return (
    <div className="word">
      <h2>
        {chosenWord.split("").map((letter) => (
          <Letter letter={letter} />
        ))}
      </h2>
    </div>
  );
};

export default Word;
