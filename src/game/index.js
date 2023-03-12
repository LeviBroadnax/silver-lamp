import "./FlashCard.css";

import { frenchStore, gameStore } from "../store";
import { onSwipe, onUserFlip } from "./flipInputs";

import Back from "./back";
import Celebrate from "../celebration";
import Example from "./example";
import Front from "./front";
import Guess from "./guess";
import React from "react";
import Stats from "./stats";
import { playWrong } from "../audio";

export { Back, Front, Example, Guess, Stats };

export default function Game() {
  const nextWord = frenchStore((e) => e.nextWord);
  const [add, incrementCorrect, currentWord] = gameStore((e) => [
    e.add,
    e.incrementCorrect,
    e.currentWord,
  ]);

  const onCorrect = (e, guessLength, flips) => {
    e.preventDefault();
    e.stopPropagation();
    Celebrate(guessLength, flips, currentWord);
    onUserFlip(e, true).then(() => {
      nextWord();
      incrementCorrect();
    });
  };

  const onWrong = (e) => {
    e.preventDefault();
    e.stopPropagation();
    playWrong();
    onUserFlip(e, true).then(() => {
      add(currentWord.rank - 1);
      nextWord();
    });
  };

  return (
    <div className='Content'>
      <Example />
      <Guess
        onCorrect={onCorrect}
        onWrong={onWrong}
        flipFunction={onUserFlip}
      />
      <Stats />
      <div
        className='CardContainer'
        onMouseEnter={onUserFlip}
        onTouchMove={onSwipe}
        onTouchStart={onSwipe}>
        <Front />
        <Back />
      </div>
    </div>
  );
}
