import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


if (module.hot) {
  module.hot.accept();
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
