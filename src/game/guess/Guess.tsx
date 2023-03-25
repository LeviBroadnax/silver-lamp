import GuessOral from "./Guess.oral";
import { GuessProps } from ".";
import GuessType from "./Guess.type";
import React from "react";

export default function Guess(props: GuessProps): JSX.Element {
  return props.isOral ? <GuessOral {...props} /> : <GuessType {...props} />;
}
