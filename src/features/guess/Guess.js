import "./Guess.css";

import React, { useEffect, useState } from "react";

import Celebrate from "../celebration/Celebrations";
import { queryStore } from "../../store/FrenchQuery";

export default function Guess(props) {
  const [guess, setGuess] = useState("");
  const [flips, setFlips] = useState(1);
  const onKeyUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if ((e.key >= "a" && e.key <= "z") || e.key === " ") {
      setGuess(guess + e.key);
    } else if (e.key === "Backspace") {
      if (e.ctrlKey) {
        setGuess("");
      } else {
        setGuess(guess.slice(0, -1));
      }
    } else if (e.key === "Enter") {
      if (queryStore.highEnough(props.idx, guess)) {
        Celebrate(guess.length, flips);
        props.onCorrect(e);
      } else {
        props.onMouseEnter(e);
        setTimeout(props.onMouseLeave, 1500);
        setTimeout(() => props.onWrong(e), 2000);
      }
      setFlips(1);
      setGuess("");
    } else if (e.key === "Shift" || e.key === "Tab") {
      props.onMouseEnter(e);
      setTimeout(props.onMouseLeave, 1500);
      setFlips(flips / 2);
    }
  };
  useEffect(() => {
    if (guess.length > 0) {
      document.querySelector(".Guess").classList.remove("hidden");
      document.querySelector(".Guess").classList.add("visible");
    } else {
      document.querySelector(".Guess").classList.add("hidden");
      document.querySelector(".Guess").classList.remove("visible");
    }
  }, [guess]);
  return (
    <input
      autoFocus
      className='Guess hidden'
      value={guess}
      onKeyUp={onKeyUp}
      onChange={onKeyUp}
      onKeyDown={(e) => {
        e.preventDefault();
      }}
    />
  );
}