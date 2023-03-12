import "./Front.css";

import React from "react";
import { gameStore } from "../../store";
import { playFrench } from "../../audio";

export default function Front() {
  const currentWord = gameStore((e) => e.currentWord);
  const word = currentWord();
  playFrench(word);
  return (
    <div className='CardContainer Front'>
      <div className='Rank hardlyinteresting'>({word.rank})</div>
      <h1 className='Word' title={word.ex}>
        {word.french}
      </h1>
    </div>
  );
}
