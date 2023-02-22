import { cube } from "./3d";
import { launchConfetti } from "./confetti";
import { playSong } from "./audio";
export default function Celebrate(length, flips) {
  const scale = length * flips;
  launchConfetti(scale);
  playSong(scale);
  // cube();
}
