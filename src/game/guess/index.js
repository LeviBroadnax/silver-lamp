import "./Guess.css";

import GuessOral from "./Guess.oral";
import GuessType from "./Guess.type";
import React from "react";

export default function Guess(props) {
  return props.isOral ? <GuessOral {...props} /> : <GuessType {...props} />;
}
