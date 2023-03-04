import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game";
import MenuContainer from "./components/MenuContainer";

const App = () => {
  return (
    <div>
      <MenuContainer />
      <Game />
    </div>
  );
};

export default App;
