import React from "react";
import { GuessProps } from ".";
import GuessOral from "./Guess.oral";
import GuessType from "./Guess.type";

export default function Guess(props: GuessProps): JSX.Element {
  return props.isOral ? <GuessOral {...props} /> : <GuessType {...props} />;
}
