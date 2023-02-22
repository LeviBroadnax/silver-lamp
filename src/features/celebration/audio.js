let secondsLeft = 0;
let interval;
export const playSong = (scale) => {
  const audio = document.querySelector("audio");
  secondsLeft = Math.max(0, secondsLeft);

  if (!audio) return "panic";
  audio.volume = 0.1;
  if (audio) {
    audio.play();
    secondsLeft += scale * 1000;
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft -= 1000;
      } else {
        audio.pause();
        clearInterval(interval);
      }
    }, 1000);
  }
};
