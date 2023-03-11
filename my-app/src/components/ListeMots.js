import React from "react";
import "./ListeMots.css";

function ListeMots({ entries }) {
  function readAudio(link) {
    //console.log("Coucou voici le lien : " + link);
    var audio = new Audio(link);
    audio.play();
  }

  return (
    <div>
      <table class="center">
        <thead>
          <tr>
            <th>Phoneme</th>
            <th>Word</th>
            <th>Transcription</th>
            <th>Listen</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr>
              <td>{entry.phoneme}</td>
              <td>{entry.mot}</td>
              <td>{entry.phonetic}</td>
              <td>
                <img
                  onClick={() => readAudio(entry.audio)}
                  src={require("../images/white-speaker.png")}
                  height="80"
                  width="80"
                  alt=""
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListeMots;
