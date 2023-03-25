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
}
export {};
