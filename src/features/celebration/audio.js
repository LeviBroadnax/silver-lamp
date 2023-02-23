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
export const playDing = () => {
  const random = Math.random();
  if (random > 0.7) {
    var audio = new Audio("ding.mp3");
  } else {
    var audio = new Audio("dash.mp3");
  }
  audio.loop = false;
  audio.volume = 0.2;
  audio.play();
};

export const playDang = () => {
  const audio = new Audio("dang.mp3");
  audio.loop = false;
  audio.volume = 0.3;
  audio.play();
};
