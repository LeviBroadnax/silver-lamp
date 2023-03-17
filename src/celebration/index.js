import { playCorrect, playSong } from "../audio";

import { launchConfetti } from "./confetti";

export default function Celebrate(length, flips = 1, isOral = false) {
  const scale = length * flips;
  launchConfetti(scale);
  playSong(scale, isOral);
  playCorrect();
}
