import React from "react";
import { gameStore } from "../../store";

export default function Back() {
  const currentWord = gameStore((e) => e.currentWord);
  if (currentWord()) {
    const word = currentWord();
    return (
      <div className='CardContainer Back'>
        <h1 className='Word'>{word.english}</h1>
        <h1 className='Category'>{word.cat}</h1>
      </div>
    );
  }
  return <></>;
}
