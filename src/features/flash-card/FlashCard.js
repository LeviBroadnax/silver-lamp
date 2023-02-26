import "./FlashCard.css";

import { DragFlipOver, FlipOver, FlipToFront } from "./FlipAnimation";
import React, { useState } from "react";

import Back from "./FlashCardBack";
import Example from "../example/Example";
import Front from "./FlashCardFront";
import Guess from "../guess/Guess";
import Stats from "../stats/Stats";
import { queryStore } from "../../store/FrenchQuery";

export default function FlashCards(props) {
  const [idx, setIdx] = useState(queryStore.semiRandomIndex());
  const seen = props.store((e) => e.seen);
  const add = props.store((e) => e.add); // move to game store
  const [total, setTotal] = useState(0); // move to game store
  const [correct, setCorrect] = useState(0); // move to game store
  const onCorrect = (e) => {
    e.preventDefault();
    setTotal(total + 1);
    setIdx(queryStore.semiRandomIndex(seen));
    setCorrect(correct + 1);
  };
  const onWrong = (e) => {
    e.preventDefault();
    add(idx);
    setTotal(total + 1);
    setIdx(queryStore.semiRandomIndex(seen));
  };
  let nextFlipHover = new Date().getTime();
  const onHover = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    let delta = new Date().getTime() - nextFlipHover;
    if (delta < 1000) {
      return;
    } else if (ev.type === "mouseenter") {
      nextFlip = new Date().getTime() + 1000;
      FlipOver();
      setTimeout(FlipToFront, 900);
    }
  };

  let startTouch = { x: 0, y: 0 };
  let nextFlip = new Date().getTime();
  const onSwipe = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    let delta = new Date().getTime() - nextFlip;
    if (delta < 1000) {
      return;
    } else if (ev.type === "touchmove") {
      const absDx = Math.abs(ev.touches[0].clientX - startTouch.x);
      const absDy = Math.abs(ev.touches[0].clientY - startTouch.y);
      if (Math.max(absDx, absDy) > 10) {
        let swipeDirection = absDx >= absDy ? "horizontal" : "vertical";
        nextFlip = new Date().getTime() + 1000;
        DragFlipOver(swipeDirection);
      }
    } else if (ev.type === "touchstart") {
      startTouch = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
    }
  };

  return (
    <div className='Content'>
      <Example idx={idx} />
      <Guess
        idx={idx}
        onCorrect={onCorrect}
        onWrong={onWrong}
        onMouseEnter={onHover}
      />
      <Stats total={total} correct={correct} />
      <div
        className='FlashCard'
        onMouseEnter={onHover}
        onTouchMove={onSwipe}
        onTouchStart={onSwipe}>
        <Front idx={idx} />
        <Back idx={idx} />
      </div>
    </div>
  );
}
