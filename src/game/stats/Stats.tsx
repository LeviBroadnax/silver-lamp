import React from "react";
import { gameStore } from "../../store";
import * as styles from "./Stats.module.css";

export default function Stats() {
  const successRate = gameStore((e) => e.successRate);
  const success = successRate();
  if (!Number.isNaN(success)) {
    return <div className={styles.Stats}> {success.toFixed(2)} %</div >;
  }
  return <></>;
}
