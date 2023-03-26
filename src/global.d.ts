declare global {
  interface SpeechRecognitionResult {
    results: any[];
    resultIndex: any;
  }
  interface Window {
    SpeechRecognition: any;
    SpeechRecognitionResult: SpeechRecognitionResult;
    SpeechRecognitionResultList: any;
    webkitSpeechRecognition: any;
    webkitSpeechRecognitionEvent: any;
  }
  declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }

  declare interface IWord {
    cat: string;
    categories: string[];
    english: string;
    exEnglish: string;
    exFrench: string;
    french: string;
    rank: number;
    tts: string;
  }
}

export {};
