import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Analytics } from "@vercel/analytics/react";
import "animate.css";

import "./utils/i18n";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Analytics />
    <App />
  </React.StrictMode>
);

reportWebVitals();
