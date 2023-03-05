import "./Guess.css";

import React, { useEffect, useState } from "react";

import { frenchStore } from "../../store";

setInterval(() => {
  const input = document.querySelector("input#GuessInput");
  if (input && "focus" in input && typeof input.focus === "function") {
    input.focus();
  }
}, 500);

export default function Guess(props) {
  const [guess, setGuess] = useState("");
  const [flips, setFlips] = useState(1);
  const onKeyUp = (e) => {
    e.preventDefault();
    e.key = e.key.toLowerCase();
    if (
      e.key.length === 1 &&
      ((e.key >= "a" && e.key <= "z") ||
        (e.key >= "0" && e.key <= "9") ||
        e.key === " ")
    ) {
      setGuess(guess + e.key);
    } else if (e.key === "backspace") {
      if (e.ctrlKey) {
        setGuess("");
      } else {
        setGuess(guess.slice(0, -1));
      }
    } else if (e.key === "enter") {
      if (frenchStore.highEnough(props.idx, guess)) {
        props.onCorrect(e, guess.length, flips);
      } else {
        props.onWrong(e);
      }
      setFlips(1);
      setGuess("");
    } else if (e.key === "shift" || e.key === "tab") {
      props.flipFunction(e, true);
      setFlips(flips / 2);
    }
  };
  useEffect(() => {
    if (guess.length > 0) {
      document.querySelector("input#GuessInput").classList.remove("hidden");
      document.querySelector("input#GuessInput").classList.add("visible");
    } else {
      document.querySelector("input#GuessInput").classList.add("hidden");
      document.querySelector("input#GuessInput").classList.remove("visible");
    }
  }, [guess]);

  return (
    <input
      autoFocus
      id='GuessInput'
      className='hidden'
      value={guess}
      onKeyUp={onKeyUp}
      onChange={onKeyUp}
      onKeyDown={(e) => {
        e.preventDefault();
      }}
    />
  );
}
