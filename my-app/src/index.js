import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MenuContainer from "./MenuContainer";
import raw from "./data.txt";


const phonemedictionnary = {'/':'none','h':'h','ə':'e','l':'l','o':'o','ʊ':'none','.':'none',
'ɪ':'i','l':'l','i':'i','t':'t','ˈ':'here','b':'b'}





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
    //create a button that will be pushed when the letter is clicked, doing letterPushed() function with the index of the button in parameter
    return (
      <button className="letter" onClick={() => letterPushed()}>
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
  const Http = new XMLHttpRequest();
  
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/{}".replace('{}',"hello");
  Http.open("GET", url);
  Http.send();
  Http.responseType = "json";
  Http.onload = () => {
    if (Http.readyState == 4 && Http.status == 200) {
      const data = Http.response;
      
      let extractedPhoneme=extractPhoneme(data);
      let phonemeTrad=phonemeTraitement(extractedPhoneme);

      let phoneme=phonemeTrad[0];
      let stress=phonemeTrad[1];
      
      console.log(phoneme);
      console.log(stress);
      

      
    } else {
      console.log(`Error: ${Http.status}`);
    }
  };
}


function extractPhoneme(data){
  var phoneme = data[0].phonetics[0].text;
  //tant que le phoneme est null
  let i = 1;
  while (phoneme == null){
    phoneme = data[0].phonetics[i].text;
    i++;
  }
  return phoneme;
    
}

function wordTraitement(word){
  //we want to transform the double letter into a single letter
  for (let i=0;i<word.length;i++){
    if (word[i] == word[i+1]){
      word = word.slice(0,i) + word.slice(i+1);
    }
  }
  return word;

}

function phonemeTraitement(phoneme){
  var translation = "";
  var stress = "none";
  for (let i=0;i<phoneme.length;i++){
    var letter = phonemedictionnary[phoneme[i]];
    console.log("letter : " + letter);
    if (letter == 'none'){
      continue;
    }
    if (letter == 'here'){
      stress = i;
      continue;
    }
    translation += letter;

  }
  console.log("stress" + stress)
  return [translation,stress-1];


}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
const menuContainer = ReactDOM.createRoot(document.getElementById("menu"));

root.render(<Game />);
menuContainer.render(<MenuContainer />);
