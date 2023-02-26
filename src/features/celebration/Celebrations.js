// import { cube } from "./3d";
import { launchConfetti } from "./confetti";
import { playCorrect } from "../audio/playFx";
import { playSong } from "../audio/playSong";

export default function Celebrate(length, flips) {
  const scale = length * flips;
  launchConfetti(scale);
  playSong(scale);
  playCorrect();
  // cube();
}
