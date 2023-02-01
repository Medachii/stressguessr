import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

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
  var fr = new FileReader();
  let file = open("words.txt", "r");

  let wordChoosen = fr.readAsText(file);
  console.log(wordChoosen);

}
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
