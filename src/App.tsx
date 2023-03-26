import Audio from "./audio";
import Categories from "./categories";
import Game from "./game";
import Legend from "./legend";
import React from "react";
import styles from "./App.module.css";

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
