let secondsLeft = 0;
let interval;

export const playSong = (scale, isOral) => {
  const audio = document.querySelector("audio#song");
  secondsLeft = Math.max(0, secondsLeft);
  if (!audio) return "panic";
  audio.volume = 0.05;
  if (audio) {
    audio.play();
    secondsLeft += scale * 1000;
    if (isOral) {
      secondsLeft += 4000;
    }
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
