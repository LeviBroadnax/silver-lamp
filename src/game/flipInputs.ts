import { DragFlipOver, FlipOver, FlipToFront } from "./animations";

let nextFlipHover = new Date().getTime();
let nextFlip = new Date().getTime();
let startTouch = { x: 0, y: 0 };

export const onUserFlip = (
  ev: React.MouseEvent | React.KeyboardEvent | true
) => {
  if (ev !== true) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  return new Promise((resolve, reject) => {
    const delta = new Date().getTime() - nextFlipHover;
    nextFlipHover = new Date().getTime();
    if (delta < 300) {
      reject("too soon");
    } else if (ev === true || ev.type === "mouseenter") {
      nextFlip = new Date().getTime() + 300;
      FlipOver();
      setTimeout(() => {
        FlipToFront(resolve);
      }, 900);
    } else {
      reject("invalid event");
    }
  });
};

export const onSwipe = (ev: React.TouchEvent) => {
  ev.preventDefault();
  const delta = new Date().getTime() - nextFlip;
  if (delta < 1000) {
    return;
  } else if (ev.type === "touchmove") {
    const absDx = Math.abs(ev.touches[0].clientX - startTouch.x);
    const absDy = Math.abs(ev.touches[0].clientY - startTouch.y);
    if (Math.max(absDx, absDy) > 10) {
      const swipeDirection = absDx >= absDy ? "horizontal" : "vertical";
      nextFlip = new Date().getTime() + 1000;
      DragFlipOver(swipeDirection);
    }
  } else if (ev.type === "touchstart") {
    startTouch = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
  }
};
