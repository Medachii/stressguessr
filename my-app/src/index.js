import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MenuContainer from './MenuContainer'
import raw from './data.txt'


class Game extends React.Component {
  render() {
    
    wordChoose();
    
    return (
      <div className="game">
        <h1>stressguessr</h1>
        <Word word="hello" />         
      </div>
    );
  }
}

class Letter extends React.Component {
  render() {
    return (
      <button onClick={letterPushed}>
        {this.props.letter}
      </button>
    );
  }
}

class Word extends React.Component {
  render() {
    return (
      <div className="word">
        <h2>
          
          {this.props.word.split('').map((letter) => <Letter letter={letter} />)}

        </h2>
      </div>
    );
  }
}

function letterPushed() {
  console.log("letter pushed");
}

function wordChoose(){
  fetch(raw)
  .then(response => response.text())
  .then(text => {
    var wordList = text.split("\n");
    var word = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    return word;
  })

}
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
const menuContainer = ReactDOM.createRoot(document.getElementById("menu"));

root.render(<Game />);
menuContainer.render(<MenuContainer />);
