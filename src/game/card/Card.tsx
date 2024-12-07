import { onSwipe, onUserFlip } from "../flipInputs";

import React from "react";
import * as styles from "./Card.module.css";

interface CardProps {
  word: IWord;
}

export const Back: React.FC<CardProps> = (props) => {
  const word = props.word;
  return (
    <div id="Back" className={`${styles.CardContainer} ${styles.Back}`}>
      <h1 className={styles.Word}>{word.english}</h1>
      <h1 className={styles.Category}>{word.cat}</h1>
    </div>
  );
};

export const Front: React.FC<CardProps> = (props) => {
  const word = props.word;
  return (
    <div id="Front" className={`${styles.CardContainer} ${styles.Front}`}>
      <div className={styles.Rank}>({word.rank})</div>
      <h1 className={styles.Word} title={word.exFrench}>
        {word.french}
      </h1>
    </div>
  );
};

const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={styles.CardContainer}
      onMouseEnter={(ev) => onUserFlip(ev).catch(console.info)}
      onTouchMove={onSwipe}
      onTouchStart={onSwipe}
    >
      <Front word={props.word} />
      <Back word={props.word} />
    </div>
  );
};
export default Card;
