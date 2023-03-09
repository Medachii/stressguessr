import React from 'react';

function ListeMots({entries}) {

    function readAudio(link) {
        var audio = new Audio(link);
        audio.play();
    }
    
    return(
        <div>
            <table>
                <tr>
                    <th>Phoneme</th>
                    <th>Word</th>
                    <th>Transcription</th>
                    <th>Listen</th>
                </tr>
                {entries.map(entry => (
                    <tr>
                        <td>{entry.phoneme}</td>
                        <td>{entry.mot}</td>
                        <td>{entry.phonetic}</td>
                        <td><button onClick={readAudio(entry.audio)}>Listen</button></td>
                    </tr>
                ))}
            </table>
        </div>

    )

}

export default ListeMots;