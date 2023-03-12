import React from 'react';
import './home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Home</h1>

            <p>Welcome to stressguessr !</p>
            <p>stressguessr is a game that is made to teach you how to pronounce the words of the English language ! We use word from the <a href='https://www.oxfordlearnersdictionaries.com/wordlist/american_english/oxford3000/'>Oxford 3000</a> dictionary, which contains 3000 of the most used word in the English language.</p>
            <p>We also use the <a href='https://dictionaryapi.dev/'>Dictionary API</a>, to get the information (phonetics, definition...) of our words.</p>

            <p>On this website, you can find a <a href='http://localhost:3000/dictionary'>dictionary</a> that explains a bit of how to read the phonetic writing of words, and the true <a href='http://localhost:3000/game'>game</a> part, powered by our own phonetics-written language translation algorithm.</p>
        </div>
    );
}

export default Home;