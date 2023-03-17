import "./styles/App.css";

import Audio from "./audio";
import Categories from "./categories";
import Game from "./game";
import Legend from "./legend";
import React from "react";

function App() {
  return (
    <div className='App'>
      <Game />
      <Legend />
      <Audio />
      <Categories />
    </div>
  );
}

export default App;
