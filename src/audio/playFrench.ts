import { IWord } from "../store";

let lastWord = "";
export const playFrench = (word: IWord) => {
  const audio = document.querySelector(
    "audio#FrenchPronunciation"
  ) as HTMLAudioElement;
  if (!audio) return;
  if (lastWord === word.french) return;
  lastWord = word.french;
  let newUrl;
  if (word.tts === "MISSING") {
    newUrl = `https://d7mj4aqfscim2.cloudfront.net/tts/fr/token/${word.french}`;
  } else if (word.tts === "INVALID") {
    console.info(word.english, word.rank + 1);
    return;
  } else {
    newUrl = "https://d1vq87e9lcf771.cloudfront.net/" + word.tts;
  }
  if (audio.src === newUrl) return;
  audio.loop = false;
  audio.volume = 1;
  audio.src = newUrl;
  audio.play().catch((e) => {});
};
