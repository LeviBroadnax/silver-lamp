import { onSwipe, onUserFlip } from "../flipInputs";

import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  word: IWord;
}

function Back(props: CardProps): JSX.Element {
  const word = props.word;
  return (
    <div id="Back" className={`${styles.CardContainer} ${styles.Back}`} >
      <h1 className={styles.Word}>{word.english}</h1>
      <h1 className={styles.Category}>{word.cat}</h1>
    </div >
  );
}

function Front(props: CardProps): JSX.Element {
  const word = props.word;
  return (
    <div id="Front" className={`${styles.CardContainer} ${styles.Front}`}>
      <div className={styles.Rank}>({word.rank})</div>
      <h1 className={styles.Word} title={word.exFrench}>
        {word.french}
      </h1>
    </div>
  );
}


export default function Card(props: CardProps): JSX.Element {
  return (
    <div
      className={styles.CardContainer}
      onMouseEnter={(ev) => onUserFlip(ev)}
      onTouchMove={onSwipe}
      onTouchStart={onSwipe}>
      <Front word={props.word} />
      <Back word={props.word} />
    </div>
  );

}