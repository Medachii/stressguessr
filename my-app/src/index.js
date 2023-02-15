import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MenuContainer from "./MenuContainer";
import raw from "./data.txt";


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
    return <button onClick={letterPushed}>{this.props.letter}</button>;
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
  const Http = new XMLHttpRequest();
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/hello";
  Http.open("GET", url);
  Http.send();
  Http.responseType = "json";
  Http.onload = () => {
    if (Http.readyState == 4 && Http.status == 200) {
      const data = Http.response;
      console.log(data);
      var stressLetter=phonemeCheck(data);
    } else {
      console.log(`Error: ${Http.status}`);
    }
  };
}


function phonemeCheck(data) {
  var phoneme = data[0].phonetics[0].text;
  console.log(phoneme);
  //determine what letter of the word is the 'stress' letter and return it
  
  //get the index of the "'" in the phoneme
  var stressIndex = phoneme.indexOf("'");
  console.log(stressIndex);
  //determine where is the stress letter in the word
  var stressLetter = phoneme[stressIndex - 1];
  console.log(stressLetter);
  //return the stress letter
  return stressLetter;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
const menuContainer = ReactDOM.createRoot(document.getElementById("menu"));

root.render(<Game />);
menuContainer.render(<MenuContainer />);
