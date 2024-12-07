import React from "react";
import { GuessProps } from ".";
import GuessOral from "./Guess.oral";
import GuessType from "./Guess.type";

const Guess: React.FC<GuessProps> = (props) => {
  return props.isOral ? <GuessOral {...props} /> : <GuessType {...props} />;
};

export default Guess;
