import React from "react";
import Game from "./components/Game";
import MenuContainer from "./components/MenuContainer";
import "./index.css";

const App = () => {
  return (
    <div class="window">
      <MenuContainer/>
      <Game />
    </div>
  );
};

export default App;
