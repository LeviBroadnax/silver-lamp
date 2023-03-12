import "./Example.css";

import React from "react";
import { distance } from "../../store";
import { gameStore } from "../../store";

const getTitleText = (word) => word.exEnglish;

const getText = (word) => {
  let res = word;
  let text = res.exFrench;
  if (text === undefined) return "No french example found";
  let wordIdx = text.indexOf(res.french);
  if (wordIdx > -1) {
    text = text.replace(res.french, res.french.toUpperCase());
  }
  return text;
};

const getTextSections = (word) => {
  let res = word;
  let text = res.exFrench;
  if (text === undefined) return getText(word);
  let wordIdx = text.indexOf(res.french);
  let highlightedWord = res.french;
  if (wordIdx === -1) {
    let highestScore = 0,
      highestElement = "";
    for (let e of text.split(" ")) {
      let score = distance(e, res.french);
      if (score > highestScore) {
        highestScore = score;
        highestElement = e;
      }
    }
    highlightedWord = highestElement;
    wordIdx = text.indexOf(highestElement);
  }
  let third = text.substring(wordIdx + highlightedWord.length);
  let first = text.substring(0, wordIdx);
  let second = highlightedWord.trim();
  if (third.startsWith("s ")) {
    second = second + "s ";
    third = third.substring(2);
  }
  return [first, second, third];
};

export default function Example(props) {
  const currentWord = gameStore((e) => e.currentWord);
  const word = currentWord();
  let sections = getTextSections(word);
  if (sections.length === 3) {
    return (
      <h4
        className='Example'
        title={getTitleText(word)}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}>
        {sections[0]}
        <span className='Highlight'>{sections[1]}</span>
        {sections[2]}
      </h4>
    );
  }
  return (
    <h4
      className='Example'
      title={getTitleText(word)}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}>
      {getText(word)}
    </h4>
  );
}
