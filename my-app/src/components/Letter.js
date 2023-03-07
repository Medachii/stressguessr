import React from "react";

const Letter = ({ index, lettre, stress, updatePoints }) => {

  

  const letterPushed = () => {
    console.log("index : " + index + ", lettre : " + lettre + ", stress : " + stress);
  
    updatePoints(10-(Math.abs(index-stress)));
  
  };





  return (
    <button className="letter" onClick={letterPushed}  >
      {lettre}
    </button>
  );
};

export default Letter;

