import "./FlashCard.css";
import "../styles/WaveButton.css";

import { KeyboardIcon, MicrophoneIcon } from "../styles/keys";
import React, { useState } from "react";
import { frenchStore, gameStore } from "../store";
import { onSwipe, onUserFlip } from "./flipInputs";

import Back from "./back";
import Celebrate from "../celebration";
import Example from "./example";
import Front from "./front";
import Guess from "./guess";
import { Notyf } from "notyf";
import Stats from "./stats";
import { playWrong } from "../audio";
import { useBoolean } from "../hooks";

const notif = new Notyf();
export default function Game() {
  const nextWord = frenchStore((e) => e.nextWord);
  const [add, incrementCorrect, currentWord] = gameStore((e) => [
    e.add,
    e.incrementCorrect,
    e.currentWord,
  ]);
  const [clicked, setClicked] = useState(false);
  const [isOral, setIsOral] = useBoolean(false);

  const onCorrect = (e, guessLength, flips) => {
    e.preventDefault();
    e.stopPropagation();
    Celebrate(guessLength, flips);
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

  const onClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      notif.error("Sorry, your browser does not support speech recognition.");
      return;
    }
    setIsOral.toggle();
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 800);
  };

  return (
    <>
      <div className='Content'>
        <button
          className={`wave-button${clicked ? " clicked" : ""}`}
          onClick={onClick}>
          {isOral ? <MicrophoneIcon /> : <KeyboardIcon />}
        </button>
        <Example />
        <Guess
          isOral={isOral}
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
    </>
  );
}
