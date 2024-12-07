import { playCorrect, playSong } from "../audio";

import { launchConfetti } from "./confetti";

export default function Celebrate() {
  launchConfetti();
  playSong();
  playCorrect();
}
