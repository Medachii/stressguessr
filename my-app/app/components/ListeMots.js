import React from "react";
import "./ListeMots.css";
import Image from "next/image";
import listen from "/app/images/white-speaker.png";

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
                <Image
                  onClick={() => readAudio(entry.audio)}
                  src={listen}
                  style={{maxHeight: '80px', maxWidth:'80px'}}
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
