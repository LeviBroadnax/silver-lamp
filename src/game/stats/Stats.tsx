import React from "react";
import { gameStore } from "../../store";

export default function Stats() {
  const successRate = gameStore((e) => e.successRate);
  const success = successRate();
  if (!Number.isNaN(success)) {
    return <div className='Stats hardlyinteresting'>{success.toFixed(2)}%</div>;
  }
  return <></>;
}
