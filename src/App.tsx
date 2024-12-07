import React from "react";
import * as styles from "./App.module.css";
import Audio from "./audio";
import Categories from "./categories";
import Game from "./game";
import Legend from "./legend";

function App() {
  return (
    <div className={styles.App}>
      <Game />
      <Legend />
      <Audio />
      <Categories />
    </div>
  );
}

export default App;
