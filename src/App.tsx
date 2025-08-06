import "./App.css";
import React from "react";
import useLocalStorage from "use-local-storage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { allThemes, DEFAULT_THEME } from "./themes";
import MainPage from "./pages/MainPage";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [currentThemeName, updateCurrentThemeName] = useLocalStorage(
    "theme",
    DEFAULT_THEME.name
  );
  const theme = allThemes[currentThemeName] || DEFAULT_THEME;

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainPage updateCurrentThemeName={updateCurrentThemeName} />
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
