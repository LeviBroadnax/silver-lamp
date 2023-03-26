import "./Guess.css";

import Guess from "./Guess";

export interface GuessProps {
  isOral: boolean;
  flipFunction: (ev: React.MouseEvent | React.KeyboardEvent | true) => void;
}

export default Guess;
