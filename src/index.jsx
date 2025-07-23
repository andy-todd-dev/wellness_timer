import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { ThemeConfigurer } from "./ThemeConfigurer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeConfigurer>
      <CssBaseline />
      <App />
    </ThemeConfigurer>
  </React.StrictMode>
);
