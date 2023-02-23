import { playDing, playSong } from "./audio";

import { cube } from "./3d";
import { launchConfetti } from "./confetti";

export default function Celebrate(length, flips) {
  const scale = length * flips;
  launchConfetti(scale);
  playSong(scale);
  playDing();
  // cube();
}
