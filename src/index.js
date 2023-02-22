import "./index.css";

import App from "./features/app/App";
import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Could not find root element");
}
