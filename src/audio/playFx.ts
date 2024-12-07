export const playCorrect = () => {
  const random = Math.random();
  const audio = random > 0.7 ? ding() : dash();
  audio.loop = false;
  audio.volume = 0.2;
  audio.play();
};

export const playIncorrect = () => {
  const audio = dang();
  audio.loop = false;
  audio.volume = 0.3;
  audio.play();
};

const ding = () => {
  let a;
  (function () {
    a = new Audio("fx/ding.mp3");
  })();
  return a;
};
const dash = () => {
  let a;
  (function () {
    a = new Audio("fx/dash.mp3");
  })();
  return a;
};
const dang = () => {
  let a;
  (function () {
    a = new Audio("fx/dang.mp3");
  })();
  return a;
};
