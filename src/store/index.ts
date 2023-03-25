import { distance } from "./jaroWinkler";
import french from "./french.json";
import { frenchStore } from "./frenchStore";
import { gameStore } from "./gameStore";

export interface IWord {
  cat: string;
  categories: string[];
  english: string;
  exEnglish: string;
  exFrench: string;
  french: string;
  rank: number;
  tts: string;
}

export enum Assessment {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  UNANSWERED = "unanswered",
}

export { gameStore, frenchStore, distance, french };
