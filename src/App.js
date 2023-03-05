import "./App.css";

import Audio from "./audio";
import Game from "./game";
import Legend from "./legend";
import React from "react";
import { gameStore } from "./store";

function App() {
  return (
    <div className='App'>
      <Game store={gameStore} />
      <Legend />
      <Audio />
      <canvas className='webgl'></canvas>
    </div>
  );
}

export default App;
