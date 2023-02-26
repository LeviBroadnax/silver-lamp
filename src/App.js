import "./App.css";

import FlashCard from "./features/flash-card/FlashCard";
import Legend from "./features/legend/Legend";
import React from "react";
import useStore from "./store/Store";

function App() {
  return (
    <div className='App'>
      <FlashCard store={useStore} />
      <Legend />
      <audio
        id='song'
        autoPlay={false}
        src='/Aux_Champs_Elysees.mp3'
        loop={true}
        preload='auto'></audio>
      <canvas className='webgl'></canvas>
    </div>
  );
}

export default App;
