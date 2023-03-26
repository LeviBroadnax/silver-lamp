import { IWord, gameStore } from "../store";
import { KeyboardIcon, MicrophoneIcon } from "../styles/keys";
import React, { useEffect, useState } from "react";
import { onSwipe, onUserFlip } from "./flipInputs";

import Back from "./back";
import Example from "./example";
import Front from "./front";
import Guess from "./guess";
import { Notyf } from "notyf";
import Stats from "./stats";
import { playFrench } from "../audio";
import { useStore } from "zustand";
import { useToggle } from "../hooks";

const notif = new Notyf();

export default function Game() {
  const store = useStore(gameStore);
  const [word, setWord] = useState<IWord>(store.currentWord());

  const [clicked, setClicked] = useState(false);
  const [isOral, toggleIsOral] = useToggle(false);

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

  useEffect(() => {
    setWord(store.currentWord());
    playFrench(store.currentWord());
  }, [store.currentWord()]);

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
          <Front word={word} />
          <Back word={word} />
        </div>
      </div>
    </>
  );
}
