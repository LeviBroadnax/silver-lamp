import React, { useEffect, useState } from "react";
import { useNotification, useToggle } from "../hooks";

import { useStore } from "zustand";
import { playFrench } from "../audio";
import { gameStore } from "../store";
import Card from "./card/Card";
import Example from "./example";
import { onUserFlip } from "./flipInputs";
import * as styles from "./Game.module.css";
import Guess from "./guess";
import Stats from "./stats";

export default function Game() {
  const store = useStore(gameStore);
  const [word, setWord] = useState<IWord>(() => store.currentWord());
  const { showError } = useNotification();

  const [clicked, setClicked] = useState(false);
  const [isOral, toggleIsOral] = useToggle(false);

  const onClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      showError("Sorry, your browser does not support speech recognition.");
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
    <div className={styles.Content}>
      <button
        className={`${styles.waveButton} ${clicked ? styles.clicked : ""}`}
        onClick={onClick}
      >
        <MicrophoneIcon />
        {isOral || "(click me!)"}
      </button>
      <Example />
      <Guess isOral={isOral} flipFunction={onUserFlip} />
      <Stats />
      <Card word={word} />
    </div>
  );
}

export const MicrophoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M12 1a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4zm5 9.9A5.002 5.002 0 0 1 7 10.9V12a1 1 0 0 0 2 0v-1.1a3.001 3.001 0 0 0 6-.002V12a1 1 0 0 0 2 0v-1.1zm-5-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 14c3.309 0 6-2.691 6-6h2c0 4.411-3.589 8-8 8s-8-3.589-8-8h2c0 3.309 2.691 6 6 6z" />
  </svg>
);
