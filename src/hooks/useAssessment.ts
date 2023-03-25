import { frenchStore, gameStore } from "../store";
import { useRef, useState } from "react";

import { Assessment } from "../store";
import Celebrate from "../celebration";
import { playWrong } from "../audio";

export const useAssessment = () => {
  const [value, setValue] = useState(Assessment.UNANSWERED);

  const updateValue = useRef({
    correct: () => {
      Celebrate();
      return setValue(Assessment.CORRECT);
    },
    incorrect: () => {
      playWrong();
      return setValue(Assessment.INCORRECT);
    },
    reset: () => {
      return setValue(Assessment.UNANSWERED);
    },
  });

  return { value, ref: updateValue.current };
};
