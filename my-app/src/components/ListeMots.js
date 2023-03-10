import React from "react";
import './ListeMots.css';

function ListeMots({ entries }) {
  function readAudio(link) {
    console.log("Coucou voici le lien : " + link);
    var audio = new Audio(link);
    audio.play();
  }

  return (
    <div className="list">
      <table>
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
                <button onClick={() => readAudio(entry.audio)}>
                    <img src="./src/images/black-speaker.png" alt="audio" height="90" width="100"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListeMots;
