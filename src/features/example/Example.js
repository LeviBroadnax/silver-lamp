import "./Example.css";

import React from "react";
import { queryStore } from "../../store/FrenchQuery";

const getTitleText = (idx) => queryStore.byId(idx).exEnglish;

const getText = (idx) => {
  let res = queryStore.byId(idx);
  let text = res.exFrench;
  if (text === undefined) return "No french example found";
  let wordIdx = text.indexOf(res.french);
  if (wordIdx > -1) {
    text = text.replace(res.french, res.french.toUpperCase());
  }
  return text;
};
const getTextSections = (idx) => {
  let res = queryStore.byId(idx);
  let text = res.exFrench;
  if (text === undefined) return getText(idx);
  let wordIdx = text.indexOf(res.french);
  let first = text.substring(0, wordIdx) + " ";
  let second = text.substring(wordIdx + res.french.length) + " ";
  return [first, " " + res.french + " ", second];
};

export default function Example(props) {
  let sections = getTextSections(props.idx);
  if (sections.length === 3) {
    return (
      <h4
        className='Example'
        title={getTitleText(props.idx)}
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
      title={getTitleText(props.idx)}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}>
      {getText(props.idx)}
    </h4>
  );
}
