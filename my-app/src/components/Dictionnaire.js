import React, { useEffect, useState } from 'react';
import ListeMots from './ListeMots';
import mots from '../dictionary.json';

function Dictionnaire() {

    const [entries, setEntries] = useState([]);


    useEffect(() => {
        setEntries(mots);
    }, []);

    return (
        <div>
        <h1>Phoneme dictionary</h1>
        <br></br>
        <p>Phonemes are the basic blocs for the phonetic writing of a word. Here is a list of the most important ones, with a word that is pronounced using them, and the pronunciation of that word. You can hear the word by pressing the button on the right.</p>
        <p>Phonemes have differents transcriptions in "normal writing". Those differents ways of writing them are called graphemes</p>
        <br></br>
        
        {
            entries ? (
                <ListeMots entries={entries} />
            ) : (
                <p>Loading dictionary...</p>
            )
        }
        </div>
        
    );
}

export default Dictionnaire;