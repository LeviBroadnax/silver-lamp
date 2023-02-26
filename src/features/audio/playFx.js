export const playCorrect = () => {
  const random = Math.random();
  const audio = random > 0.7 ? ding() : dash();
  audio.loop = false;
  audio.volume = 0.2;
  audio.play();
};

export const playWrong = () => {
  const audio = dang();
  audio.loop = false;
  audio.volume = 0.3;
  audio.play();
};

// damn this is ugly
const ding = () => {
  var a;
  (function () {
    a = new Audio("ding.mp3");
  })();
  return a;
};
const dash = () => {
  var a;
  (function () {
    a = new Audio("dash.mp3");
  })();
  return a;
};
const dang = () => {
  var a;
  (function () {
    a = new Audio("dang.mp3");
  })();
  return a;
};
