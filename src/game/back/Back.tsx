import { IWord } from "../../store";
import React from "react";

interface BackProps {
  word: IWord;
}

export default function Back(props: any) {
  const word = props.word;
  return (
    <div className='CardContainer Back'>
      <h1 className='Word'>{word.english}</h1>
      <h1 className='Category'>{word.cat}</h1>
    </div>
  );
}
