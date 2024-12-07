import { frenchStore, gameStore } from "../store";
import { playCorrect as _playCorrect, playIncorrect } from "../audio";
import { useCallback } from "react";

import Celebrate from "../celebration";
import { onUserFlip } from "../game/flipInputs";

export const useAssessment = (): [() => void, () => void] => {
  const nextWord = frenchStore((e) => e.nextWord);
  const [add, incrementCorrect, currentWord] = gameStore((e) => [
    e.add,
    e.incrementCorrect,
    e.currentWord,
  ]);

  const correct = useCallback(() => {
    Celebrate();
    onUserFlip(true)
      .then(() => {
        nextWord();
        incrementCorrect();
      })
      .catch((e) => {
        console.info(e);
      });
  }, [currentWord()]);

  const incorrect = useCallback(() => {
    playIncorrect();
    onUserFlip(true)
      .then(() => {
        add(currentWord().rank - 1);
        nextWord();
      })
      .catch((e) => {
        console.info(e);
      });
  }, [currentWord()]);

  return [correct, incorrect];
};
