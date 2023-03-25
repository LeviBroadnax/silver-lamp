import "./Guess.css";

import Guess from "./Guess";

export interface GuessProps {
  isOral: boolean;
  flipFunction: (
    e: React.KeyboardEvent<HTMLInputElement>,
    isShift: boolean
  ) => void;
}

export default Guess;
