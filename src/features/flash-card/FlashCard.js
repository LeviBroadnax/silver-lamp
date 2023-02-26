import "./FlashCard.css";

import React, { useState } from "react";

import Back from "./FlashCardBack";
import Example from "../example/Example";
import Front from "./FlashCardFront";
import Guess from "../guess/Guess";
import Stats from "../stats/Stats";
import { queryStore } from "../../store/FrenchQuery";

const dragMobileFlip = (direction, isFlipped) => {
  let front = document.querySelector(".Front");
  let back = document.querySelector(".Back");
  if (!front || !back) return;
  if (isFlipped) {
    if (direction === "right" || direction === "left") {
      front.style.transform = `rotateY(${direction === "left" ? 180 : 0}deg)`;
      back.style.transform = `rotateY(${direction === "left" ? 0 : 180}deg)`;
    } else {
      front.style.transform = `rotateX(${direction === "down" ? 180 : 0}deg)`;
      back.style.transform = `rotateX(${direction === "down" ? 0 : 180}deg)`;
    }
  } else {
    if (direction === "right" || direction === "left") {
      back.style.transform = `rotateY(${direction === "left" ? 180 : 0}deg)`;
      front.style.transform = `rotateY(${direction === "left" ? 0 : 180}deg)`;
    } else {
      back.style.transform = `rotateX(${direction === "down" ? 180 : 0}deg)`;
      front.style.transform = `rotateX(${direction === "down" ? 0 : 180}deg)`;
    }
  }
};

export default function FlashCards(props) {
  const add = props.store((e) => e.add);
  const contains = props.store((e) => e.contains);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [idx, setIdx] = useState(queryStore.semiRandomIndex());
  const [swipe, setSwipe] = useState({ x: 0, y: 0 });
  const [flipped, setFlipped] = useState(false);
  const [nextFlip, setNextFlip] = useState(new Date().getTime());
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
  };
  const flipToBack = (_ev) => {
    let front = document.querySelector(".Front");
    let back = document.querySelector(".Back");
    if (!front || !back) return;
    front.style.transform = "rotateY(180deg)";
    back.style.transform = "rotateY(0deg)";
    setFlipped(true);
  };
  const flipToFront = (_ev) => {
    let front = document.querySelector(".Front");
    let back = document.querySelector(".Back");
    if (!front || !back) return;
    front.style.transform = "rotateY(0deg)";
    back.style.transform = "rotateY(180deg)";
    setFlipped(false);
  };
  const onSwipe = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    let delta = new Date().getTime() - nextFlip;
    if (delta < 1000) return;
    if (ev.type === "touchmove") {
      const current = {
        x: ev.touches[0].clientX || 0,
        y: ev.touches[0].clientY || 0,
      };
      const [x, y] = [
        Math.abs(current.x - swipe.x),
        Math.abs(current.y - swipe.y),
      ];
      if (x > 10 || y > 10) {
        let swipeDirection = "";
        if (x > y) {
          if (current.x - swipe.x > 0) {
            swipeDirection = "right";
          } else {
            swipeDirection = "left";
          }
        } else {
          if (current.y - swipe.y > 0) {
            swipeDirection = "down";
          } else {
            swipeDirection = "up";
          }
        }
        setFlipped(!flipped);
        setNextFlip(new Date().getTime());
        dragMobileFlip(swipeDirection, flipped);
        setTimeout(flipToFront, 1500);
      }
    } else if (ev.type === "touchstart") {
      setSwipe({ x: ev.touches[0].clientX, y: ev.touches[0].clientY });
    }
  };

  return (
    <div className='Content'>
      <Example idx={idx} />
      <Guess
        idx={idx}
        onCorrect={onCorrect}
        onWrong={onWrong}
        onMouseEnter={flipToBack}
        onMouseLeave={flipToFront}
      />
      <Stats total={total} correct={correct} />
      <div
        className='FlashCard'
        onMouseEnter={flipToBack}
        onMouseLeave={flipToFront}
        onTouchMove={onSwipe}
        onTouchStart={onSwipe}>
        <Front idx={idx} />
        <Back idx={idx} />
      </div>
    </div>
  );
}
