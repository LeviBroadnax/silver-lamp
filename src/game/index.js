import "./FlashCard.css";

import React, { useState } from "react";
import { onSwipe, onUserFlip } from "./flipInputs";

import Back from "./back";
import Celebrate from "../celebration";
import Example from "./example";
import Front from "./front";
import Guess from "./guess";
import Stats from "./stats";
import { frenchStore } from "../store";
import { playWrong } from "../audio";

export { Back, Front, Example, Guess, Stats };

export default function Game(props) {
  const [idx, setIdx] = useState(frenchStore.semiRandomIndex());
  const seen = props.store((e) => e.seen);
  const add = props.store((e) => e.add);
  const successRate = props.store((e) => e.successRate);
  const incrementCorrect = props.store((e) => e.incrementCorrect);

  const onCorrect = (e, guessLength, flips) => {
    e.preventDefault();
    Celebrate(guessLength, flips, frenchStore.byId(idx));
    onUserFlip(e, true).then(() => {
      setIdx(frenchStore.semiRandomIndex(seen));
      incrementCorrect();
    });
  };

  const onWrong = (e) => {
    e.preventDefault();
    playWrong();
    onUserFlip(e, true).then(() => {
      add(idx);
      setIdx(frenchStore.semiRandomIndex(seen));
    });
  };

  return (
    <div className='Content'>
      <Example idx={idx} />
      <Guess
        idx={idx}
        onCorrect={onCorrect}
        onWrong={onWrong}
        flipFunction={onUserFlip}
      />
      <Stats successRate={successRate} />
      <div
        className='CardContainer'
        onMouseEnter={onUserFlip}
        onTouchMove={onSwipe}
        onTouchStart={onSwipe}>
        <Front idx={idx} />
        <Back idx={idx} />
      </div>
    </div>
  );
}
