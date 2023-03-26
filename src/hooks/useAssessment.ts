import { frenchStore, gameStore } from "../store";
import { playCorrect, playIncorrect } from "../audio";
import { useCallback, useState } from "react";

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
    onUserFlip(true).then(() => {
      nextWord();
      incrementCorrect();
    });
  }, [currentWord()]);

  const incorrect = useCallback(() => {
    playIncorrect();
    onUserFlip(true).then(() => {
      add(currentWord().rank - 1);
      nextWord();
    });
  }, [currentWord()]);

  return [correct, incorrect];
};
