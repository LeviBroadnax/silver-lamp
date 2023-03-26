import React, { useEffect, useState } from "react";
import { frenchStore, gameStore } from "../../store";
import { useAssessment, useNotification } from "../../hooks";

import { GuessProps } from ".";
import styles from "./Guess.module.css";

const GuessOral = (props: GuessProps): JSX.Element => {
  const highEnoughOral = frenchStore((e) => e.highEnoughOral);
  const currentWord = gameStore((e) => e.currentWord);
  const { showSuccess, showError } = useNotification();

  const [lastWord, setLastWord] = useState("");
  const [isListening, setIsListening] = useState(true);
  const [correct, incorrect] = useAssessment();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;;
    if (!SpeechRecognition) {
      showError("Sorry, your browser does not support speech recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionResult) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript.trim();
        const confidence = result[0].confidence;
        if (result.isFinal) {
          setLastWord(
            `heard: ${text} with ${(confidence * 100).toFixed(2)}% confidence`
          );
          if (highEnoughOral(currentWord(), text, confidence)) {
            correct();
          } else {
            incorrect();
          }
        } else {
          interimTranscript += text;
        }
      }
    };

    const startRecognition = () => {
      recognition.start();
    };

    const stopRecognition = () => {
      recognition.stop();
    };

    startRecognition();
    return () => {
      recognition.onend = null;
      recognition.stop();
    };
  }, [isListening]);

  return <h3 className={styles.Oral}>{lastWord}</h3>;
};

export default GuessOral;
