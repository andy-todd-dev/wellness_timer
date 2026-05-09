import "./App.css";
import React from "react";
import useLocalStorage from "use-local-storage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { allThemes, DEFAULT_THEME } from "./themes";
import { DEFAULT_SOUND, SoundKey } from "./sounds";
import MainPage from "./pages/MainPage";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [currentThemeName, updateCurrentThemeName] = useLocalStorage(
    "theme",
    DEFAULT_THEME.name,
  );
  const [currentSound, updateCurrentSound] = useLocalStorage<SoundKey>(
    "sound",
    DEFAULT_SOUND,
  );
  const theme = allThemes[currentThemeName] || DEFAULT_THEME;

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainPage
            updateCurrentThemeName={updateCurrentThemeName}
            updateCurrentSound={updateCurrentSound}
            currentSound={currentSound}
          />
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
