import React from "react";
import addPoints from "./Game";

const Letter = ({ index, lettre, stress, updatePoints }) => {

  

  const letterPushed = () => {
    console.log("index : " + index + ", lettre : " + lettre + ", stress : " + stress);
    
    //Calcul des points
    let points = 0;
    updatePoints(10-(Math.abs(index-stress)));
    



  };





  return (
    <button className="letter" onClick={letterPushed}  >
      {lettre}
    </button>
  );
};

export default Letter;

