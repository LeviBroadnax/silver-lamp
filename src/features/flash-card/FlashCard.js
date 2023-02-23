import "./FlashCard.css";

import React, { useState } from "react";

import Back from "./FlashCardBack";
import Example from "../example/Example";
import Front from "./FlashCardFront";
import Guess from "../guess/Guess";
import Stats from "../stats/Stats";
import { playDang } from "../celebration/audio";
import { queryStore } from "../../store/FrenchQuery";

const onMouseEnter = () => {
  document.querySelector(".Front").style.transform = "rotateY(180deg)";
  document.querySelector(".Back").style.transform = "rotateY(0deg)";
};
const onMouseLeave = () => {
  document.querySelector(".Front").style.transform = "rotateY(0deg)";
  document.querySelector(".Back").style.transform = "rotateY(180deg)";
};
export default function FlashCards(props) {
  const add = props.store((e) => e.add);
  const contains = props.store((e) => e.contains);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [idx, setIdx] = useState(queryStore.semiRandomIndex());
  const nextWord = () => {
    setTotal(total + 1);
    setIdx(queryStore.semiRandomIndex(contains));
  };

  const onCorrect = (e) => {
    e.preventDefault();
    nextWord();
    setCorrect(correct + 1);
  };
  const onWrong = (e) => {
    e.preventDefault();
    add(idx);
    nextWord();
    playDang();
  };

  return (
    <div className='Content'>
      <Example idx={idx} />
      <Guess
        idx={idx}
        onCorrect={onCorrect}
        onWrong={onWrong}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <Stats total={total} correct={correct} />
      <div
        className='FlashCard'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <Front idx={idx} />
        <Back idx={idx} />
      </div>
    </div>
  );
}
