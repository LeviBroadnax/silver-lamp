import "./App.css";

import FlashCard from "../flash-card/FlashCard";
import Legend from "../legend/Legend";
import React from "react";
import SideBar from "../sidebar/SideBar";
import useStore from "../../store/Store";

function App() {
  return (
    <div className='App'>
      <SideBar store={useStore} />
      <FlashCard store={useStore} />
      <Legend />
      <audio
        id='song'
        autoPlay={false}
        src='/Aux_Champs_Elysees.mp3'
        loop={true}
        preload='auto'></audio>
    </div>
  );
}
const keepInFocus = () => {
  const input = document.querySelector("input.Guess");
  if (input && "focus" in input && typeof input.focus === "function") {
    input.focus();
  }
};
setInterval(keepInFocus, 100);
export default App;
