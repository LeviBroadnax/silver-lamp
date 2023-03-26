const visible = "matrix(1, 0, 0, 1, 0, 0)";
const hidden = "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)";

const getFaces = (): HTMLDivElement[] => [
  document.getElementById("Front") as HTMLDivElement,
  document.getElementById("Back") as HTMLDivElement,
];

const FlipAroundFromFront = (front: HTMLDivElement, back: HTMLDivElement) => {
  front.style.transform = "rotateY(180deg)";
  back.style.transform = "rotateY(0deg)";
};

const FlipAroundFromBack = (front: HTMLDivElement, back: HTMLDivElement) => {
  front.style.transform = "rotateY(0deg)";
  back.style.transform = "rotateY(-180deg)";
};

const FlipOverFromFront = (front: HTMLDivElement, back: HTMLDivElement) => {
  front.style.transform = "rotateX(180deg)";
  back.style.transform = "rotateX(0deg)";
};

const FlipOverFromBack = (front: HTMLDivElement, back: HTMLDivElement) => {
  front.style.transform = "rotateX(0deg)";
  back.style.transform = "rotateX(-180deg)";
};

export const FlipOver = () => {
  const [front, back] = getFaces();
  const frontTransform = window.getComputedStyle(front).transform;
  const backTransform = window.getComputedStyle(back).transform;
  if (frontTransform === visible && backTransform === hidden) {
    FlipAroundFromFront(front, back);
  } else if (frontTransform === hidden && backTransform === visible) {
    FlipAroundFromBack(front, back);
  }
};

export const FlipToFront = (resolve: Function) => {
  const [front, back] = getFaces();
  FlipAroundFromBack(front, back);

  front.addEventListener("webkitTransitionEnd", () => {
    (front as any).removeEventListener("webkitTransitionEnd", front);
    resolve("hover");
  });
};

export const DragFlipOver = (direction: "horizontal" | "vertical") => {
  const [front, back] = getFaces();
  if (direction === "horizontal") {
    FlipAroundFromFront(front, back);
    setTimeout(() => FlipAroundFromBack(front, back), 900);
  } else {
    FlipOverFromFront(front, back);
    setTimeout(() => FlipOverFromBack(front, back), 900);
  }
};
