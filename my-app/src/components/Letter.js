import React, { useState,useEffect } from "react";
import Game from "./Game.js";



const Letter = ({ index, lettre, stress, updatePoints, playing,chosenWord }) => {

  const [bgcolor, setBgcolor] = useState("transparent");



  const letterPushed = () => {
    console.log("index : " + index + ", lettre : " + lettre + ", stress : " + stress);
  
    updatePoints(10-(Math.abs(index-stress)));
  
  };

  useEffect(() => {
    console.log("UseState triggered " + index + " " + stress );

    if (index === stress) {
      console.log("Changement de couleur");
      setBgcolor((bgcolor) => "green");
    }
    
  }, [playing] );

  useEffect(() => {
    setBgcolor((bgcolor) => "transparent");
  }, [chosenWord] );



  return (
    <button className="letter" onClick={letterPushed} style={{backgroundColor : bgcolor }}>
      {lettre}
    </button>
  );
};

export default Letter;

