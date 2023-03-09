import React, { useState,useEffect } from "react";
import Game from "./Game.js";



const Letter = ({ index, lettre, stress, updatePoints, oskur,oskur2 }) => {

  const [bgcolor, setBgcolor] = useState("white");



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
    
  }, [oskur] );

  useEffect(() => {
    setBgcolor((bgcolor) => "white");
  }, [oskur2] );



  return (
    <button className="letter" onClick={letterPushed} style={{backgroundColor : bgcolor }}>
      {lettre}
    </button>
  );
};

export default Letter;

