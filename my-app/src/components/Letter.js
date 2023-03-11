import React, { useState, useEffect, forceUpdate } from "react";
import Game from "./Game.js";



const Letter = ({ index, lettre, stress, updatePoints, playing, chosenWord }) => {

  const [bgcolor, setBgcolor] = useState("transparent");



  const letterPushed = () => {
    //console.log("index : " + index + ", lettre : " + lettre + ", stress : " + stress);
    if (stress < 0) {
      updatePoints(0);
    }
    else {
      let pointToAdd = 10 - 3 * (Math.abs(index - stress));
      if (pointToAdd < 0) {
        pointToAdd = 0;
      }
      
      updatePoints(pointToAdd);
    }

  };

  useEffect(() => {
    //console.log("UseState triggered " + index + " " + stress);

    if (index === stress) {
      //console.log("Changement de couleur");
      setBgcolor((bgcolor) => "green");
    }

  }, [playing]);

  useEffect(() => {
    setBgcolor((bgcolor) => "transparent");

  }, [chosenWord]);



  return (
    <a className="letter" onClick={letterPushed} style={{ backgroundColor: bgcolor }}>
      {lettre}
    </a>
  );
};

export default Letter;

