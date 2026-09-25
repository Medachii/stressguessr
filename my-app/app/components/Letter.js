import React, { useState, useEffect} from "react";



const Letter = ({ index, lettre, stress, updatePoints, playing, chosenWord }) => {

  const [stressed, setStressed] = useState(false);



  const letterPushed = () => {
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
    if (index === stress) {
      setStressed(true);
    }

  }, [playing]);

  useEffect(() => {
    setStressed(false);

  }, [chosenWord]);



  return (
    <button type="button" className={"letter" + (stressed ? " stressed" : "")} onClick={letterPushed}>
      {lettre}
    </button>
  );
};

export default Letter;
