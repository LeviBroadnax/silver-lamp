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
import { useToggle } from "../hooks";

const notif = new Notyf();
export default function Game() {
  const nextWord = frenchStore((e) => e.nextWord);
  const [add, incrementCorrect, currentWord] = gameStore((e) => [
    e.add,
    e.incrementCorrect,
    e.currentWord,
  ]);
  const [clicked, setClicked] = useState(false);
  const [isOral, toggleIsOral] = useToggle(false);

  const onCorrect = () => {
    onUserFlip(true).then(() => {
      nextWord();
      incrementCorrect();
    });
  };

  const onWrong = () => {
    onUserFlip(true).then(() => {
      add(currentWord().rank - 1);
      nextWord();
    });
  };

  const onClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      notif.error("Sorry, your browser does not support speech recognition.");
      return;
    }
    toggleIsOral();
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
          flipFunction={onUserFlip}
        />
        <Stats />
        <div
          className='CardContainer'
          onMouseEnter={(ev) => onUserFlip(ev)}
          onTouchMove={onSwipe}
          onTouchStart={onSwipe}>
          <Front />
          <Back />
        </div>
      </div>
    </>
  );
}
