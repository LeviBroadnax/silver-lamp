import confetti from "canvas-confetti";

export const launchConfetti = (scale) => {
  confetti({
    particleCount: 100 * scale,
    startVelocity: 5 * scale,
    spread: 360,
    shapes: ["star", "circle", "square"],
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
  });
};
