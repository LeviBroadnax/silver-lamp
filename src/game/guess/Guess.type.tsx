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
  const [correct, incorrect] = useAssessment();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newGuess = e.target.value.toLowerCase();
    setGuess(newGuess);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && guess.length > 0) {
      if (highEnough(currentWord(), guess)) {
        correct();
      } else {
        incorrect();
      }
      setFlips(1);
      setGuess("");
    } else if (e.key === "Shift" || e.key === "Tab") {
      e.preventDefault();
      props.flipFunction(true);
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
      onChange={(ev) => onChange(ev)}
      onKeyDown={(ev) => onKeyDown(ev)}
    />
  );
};

export default GuessType;
