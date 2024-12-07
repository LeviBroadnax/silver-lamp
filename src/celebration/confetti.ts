import confetti from "canvas-confetti";

export const launchConfetti = () => {
  confetti({
    particleCount: 100,
    startVelocity: 5,
    spread: 360,
    shapes: ["star", "circle", "square"],
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
  });
};
