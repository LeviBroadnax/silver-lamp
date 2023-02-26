const visible = "matrix(1, 0, 0, 1, 0, 0)";
const hidden = "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)";
export const FlipOver = () => {
  const front = document.querySelector(".Front");
  const back = document.querySelector(".Back");
  if (!front || !back) return;
  const frontTransform = window.getComputedStyle(front).transform;
  const backTransform = window.getComputedStyle(back).transform;
  if (frontTransform === visible && backTransform === hidden) {
    FlipAroundFromFront(front, back);
  } else if (frontTransform === hidden && backTransform === visible) {
    FlipAroundFromBack(front, back);
  }
};

export const FlipToFront = () => {
  const front = document.querySelector(".Front");
  const back = document.querySelector(".Back");
  if (!front || !back) return;
  FlipAroundFromBack(front, back);
};

export const DragFlipOver = (direction) => {
  let front = document.querySelector(".Front");
  let back = document.querySelector(".Back");
  if (!front || !back) return;
  if (direction === "horizontal") {
    FlipAroundFromFront(front, back);
    setTimeout(() => FlipAroundFromBack(front, back), 900);
  } else {
    FlipOverFromFront(front, back);
    setTimeout(() => FlipOverFromBack(front, back), 900);
  }
};
const FlipAroundFromFront = (front, back) => {
  front.style.transform = "rotateY(180deg)";
  back.style.transform = "rotateY(0deg)";
};

const FlipAroundFromBack = (front, back) => {
  front.style.transform = "rotateY(0deg)";
  back.style.transform = "rotateY(-180deg)";
};

const FlipOverFromFront = (front, back) => {
  front.style.transform = "rotateX(180deg)";
  back.style.transform = "rotateX(0deg)";
};

const FlipOverFromBack = (front, back) => {
  front.style.transform = "rotateX(0deg)";
  back.style.transform = "rotateX(-180deg)";
};
