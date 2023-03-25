import React, { useEffect, useState } from "react";
import { frenchStore, gameStore } from "../../store";

import { GuessProps } from ".";
import { Notyf } from "notyf";
import { useAssessment } from "../../hooks";

const notif = new Notyf();
const GuessOral = (props: GuessProps): JSX.Element => {
  const highEnoughOral = frenchStore((e) => e.highEnoughOral);
  const currentWord = gameStore((e) => e.currentWord);

  const [lastWord, setLastWord] = useState("");
  const [isListening, setIsListening] = useState(true);
  const assess = useAssessment();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;;
    if (!SpeechRecognition) {
      notif.error("Sorry, your browser does not support speech recognition.");
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
      // if ('results' not in ev && !ev.results) return;

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
            assess.ref.correct();
          } else {
            assess.ref.incorrect();
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

  return <h3 className='oral mildlyinteresting'>{lastWord}</h3>;
};

export default GuessOral;
