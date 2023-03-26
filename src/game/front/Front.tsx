import { IWord } from "../../store";
import React from "react";

interface FrontProps {
  word: IWord;
}

export default function Front(props: FrontProps) {
  const word = props.word;
  return (
    <div className='CardContainer Front'>
      <div className='Rank hardlyinteresting'>({word.rank})</div>
      <h1 className='Word' title={word.exFrench}>
        {word.french}
      </h1>
    </div>
  );
}
