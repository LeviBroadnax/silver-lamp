import React, { useEffect, useState } from "react";
import { frenchStore, gameStore } from "../../store";

import { GuessProps } from "."
import { useAssessment } from "../../hooks";

setInterval(() => {
  const input = document.querySelector("input#GuessInput");
  if (input && "focus" in input && typeof input.focus === "function") {
    input.focus();
  }
}, 500);

const GuessType = (props: GuessProps) => {
  const highEnough = frenchStore((e) => e.highEnough);
  const currentWord = gameStore((e) => e.currentWord);

  const [guess, setGuess] = useState("");
  const [flips, setFlips] = useState(1);
  const assess = useAssessment();

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      if (highEnough(currentWord(), guess)) {
        assess.ref.correct();
      } else {
        assess.ref.incorrect();
        setFlips(1);
        setGuess("");
      }
    } else if (e.key === "shift" || e.key === "tab") {
      props.flipFunction(e, true);
      setFlips(flips / 2);
    }
  };
  useEffect(() => {
    const guessInput = document.querySelector("input#GuessInput");
    if (guessInput === null) return;
    if (guess.length > 0) {
      guessInput.classList.replace("hidden", "visible")
    } else {
      guessInput.classList.replace("visible", "hidden")
    }
  }, [guess]);

  return (
    <input
      autoFocus
      id='GuessInput'
      className='hidden'
      value={guess}
      onKeyUp={(ev) => onKeyUp(ev)}
      onKeyDown={(e) => {
        e.preventDefault();
      }}
    />
  );
};

export default GuessType;
