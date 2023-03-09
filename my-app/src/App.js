import React from "react";
import "./index.css";
import { Route, Routes, Link } from "react-router-dom";

import Home from "./components/Home";
import Game from "./components/Game";
import Dictionary from "./components/Dictionnaire";

const App = () => {
  return (
    <div class="window">
      <div class="navbar">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
            <li>
              <Link to="dictionary">Dictionary</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/dictionary" element={<Dictionary />} />
      </Routes>
    </div>
  );
};

export default App;
