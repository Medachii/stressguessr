import React from "react";
import { playAudio } from "/app/api/dictionary.js";

function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function ListeMots({ entries }) {
  return (
    <div className="table-wrap">
      <table className="phoneme-table">
        <thead>
          <tr>
            <th>Phoneme</th>
            <th>Word</th>
            <th>Transcription</th>
            <th>Listen</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td className="phoneme">{entry.phoneme}</td>
              <td>{entry.mot}</td>
              <td className="transcription">{entry.phonetic}</td>
              <td>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => playAudio(entry.audio)}
                  aria-label={"Listen to " + entry.mot}
                >
                  <SpeakerIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { SpeakerIcon };
export default ListeMots;
