import { playCorrect, playSong } from "../audio";

import { launchConfetti } from "./confetti";

// import { render3dText } from "./3d";

export default function Celebrate(length, flips, word) {
  const scale = length * flips;
  launchConfetti(scale);
  playSong(scale);
  playCorrect();
  if (word.french === undefined) {
    return "PANIC";
  }
  // render3dText(word.french);
}
