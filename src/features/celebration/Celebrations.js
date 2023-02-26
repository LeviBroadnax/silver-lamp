import { launchConfetti } from "./confetti";
import { playCorrect } from "../audio/playFx";
import { playSong } from "../audio/playSong";

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
