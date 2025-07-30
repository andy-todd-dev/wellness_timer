import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { ThemeConfigurer } from "./ThemeConfigurer";
import ErrorBoundary from "./ErrorBoundary";

const container = document.getElementById("root");
if (!container) throw new Error('Root container missing in index.html');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeConfigurer>
        <CssBaseline />
        <App />
      </ThemeConfigurer>
    </ErrorBoundary>
  </React.StrictMode>
);
