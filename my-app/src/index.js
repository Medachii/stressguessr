import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MenuContainer from './MenuContainer'
import raw from './data.txt'


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenWord: "",
    };
  }

  componentDidMount() {
    this.wordChoose();
  }

  wordChoose = async () => {
    const response = await fetch(raw);
    const text = await response.text();
    const wordList = text.split("\n");
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("Choosen Word : " + word);
    this.setState({ choosenWord: word });
  };

  render() {
    return (
      <div className="game">
        <h1>stressguessr</h1>
        <Word choosenWord={this.state.choosenWord} />
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
          {this.props.choosenWord.split("").map((letter) => (
            <Letter letter={letter} />
          ))}
        </h2>
      </div>
    );
  }
}

function letterPushed() {
  console.log("letter pushed");
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
const menuContainer = ReactDOM.createRoot(document.getElementById("menu"));

root.render(<Game />);
menuContainer.render(<MenuContainer />);
