import React, { useEffect, useState } from "react";
import { useNotification, useToggle } from "../hooks";

import Card from "./card/Card";
import Example from "./example";
import Guess from "./guess";
import Stats from "./stats";
import { gameStore } from "../store";
import { onUserFlip } from "./flipInputs";
import { playFrench } from "../audio";
import styles from "./Game.module.css";
import { useStore } from "zustand";

export default function Game() {
  const store = useStore(gameStore);
  const [word, setWord] = useState<IWord>(store.currentWord());
  const { showSuccess, showError } = useNotification();

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
        onClick={onClick}>
        {isOral ? <MicrophoneIcon /> : <KeyboardIcon />}
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
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'>
    <path d='M12 1a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4zm5 9.9A5.002 5.002 0 0 1 7 10.9V12a1 1 0 0 0 2 0v-1.1a3.001 3.001 0 0 0 6-.002V12a1 1 0 0 0 2 0v-1.1zm-5-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 14c3.309 0 6-2.691 6-6h2c0 4.411-3.589 8-8 8s-8-3.589-8-8h2c0 3.309 2.691 6 6 6z' />
  </svg>
);

export const KeyboardIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'>
    <path d='M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-1 15H4V6h16v12zm-2-11H5v2h13V7zm-1 5H6v2h11v-2zm-5 5H5v2h7v-2zm8 0h-3v2h3v-2z' />
  </svg>
);