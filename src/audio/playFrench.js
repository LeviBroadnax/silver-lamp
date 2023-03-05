export const playFrench = (word) => {
  const audio = document.querySelector("audio#FrenchPronunciation");
  if (!audio) return;
  let newUrl =
    word.tts === "MISSING"
      ? `https://d7mj4aqfscim2.cloudfront.net/tts/fr/token/${word.french}`
      : "https://d1vq87e9lcf771.cloudfront.net/" + word.tts;
  if (audio.src === newUrl) return;
  audio.loop = false;
  audio.volume = 1;
  audio.src = newUrl;
  audio.play().catch((e) => {});
};
