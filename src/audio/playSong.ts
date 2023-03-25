let secondsLeft = 0;
let interval: NodeJS.Timer;

export const playSong = () => {
  const audio = document.querySelector("audio#song") as HTMLAudioElement;
  secondsLeft = Math.max(0, secondsLeft);
  if (!audio) return "panic";
  audio.volume = 0.05;
  if (audio) {
    audio.play();
    secondsLeft += 5000;
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
