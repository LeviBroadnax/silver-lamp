import React, { useEffect, useState } from "react";
import { useAssessment, useNotification } from "../../hooks";
import { frenchStore, gameStore } from "../../store";

import { GuessProps } from ".";
import * as styles from "./Guess.module.css";

const GuessOral: React.FC<GuessProps> = (_props) => {
  const highEnoughOral = frenchStore((e) => e.highEnoughOral);
  const currentWord = gameStore((e) => e.currentWord);
  const { showError } = useNotification();

  const [lastWord, setLastWord] = useState("");
  const [isListening, setIsListening] = useState(true);
  const [correct, incorrect] = useAssessment();

  useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition;
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

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const interimTranscript = [];
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]; // This is of type SpeechRecognitionResult
        const text = result[0].transcript.trim(); // Access the first alternative
        const confidence = result[0].confidence;
        interimTranscript.push(text);
        if (result.isFinal) {
          setLastWord(
            `heard: ${text} with ${(confidence * 100).toFixed(2)}% confidence`
          );
          if (highEnoughOral(currentWord(), text, confidence)) {
            correct();
          } else {
            incorrect();
          }
        }
      }
      console.info(`Transcript: ${interimTranscript.join("\n")}`);
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
      stopRecognition();
    };
  }, [isListening]);
  return <h3 className={styles.oral}>{lastWord}</h3>;
};

export default GuessOral;
