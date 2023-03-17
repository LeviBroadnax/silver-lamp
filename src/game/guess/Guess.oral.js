import React, { useEffect, useState } from "react";
import { frenchStore, gameStore } from "../../store";

import { Notyf } from "notyf";

const notif = new Notyf();
const GuessOral = (props) => {
  const highEnoughOral = frenchStore((e) => e.highEnoughOral);
  const currentWord = gameStore((e) => e.currentWord);

  const [lastWord, setLastWord] = useState("");

  const [isListening, setIsListening] = useState(true);
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      notif.error("Sorry, your browser does not support speech recognition.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;
        const confidence = result[0].confidence;

        if (result.isFinal) {
          setLastWord(
            `heard: ${text} with ${(confidence * 100).toFixed(2)}% confidence`
          );
          if (highEnoughOral(currentWord(), text.trim(), confidence)) {
            props.onCorrect(event, text.length, 1);
          } else {
            props.onWrong(event);
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

    if (isListening) {
      startRecognition();
    } else {
      stopRecognition();
    }
    return () => {
      recognition.onend = null;
      recognition.stop();
    };
  }, [isListening]);

  return <h3 className='oral mildlyinteresting'>{lastWord}</h3>;
};

export default GuessOral;
