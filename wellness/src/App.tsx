import "./App.css";
import React, { useState } from "react";
import MeditationTimer from "./meditationTimer/MeditationTimer";
import { useWakeLock } from "react-screen-wake-lock";
import InfoIcon from "@mui/icons-material/Info";
import Config from "./Config";
import DevDataModal from "./DevDataModal";
// import water_background from "./images/water_bg.webp";
import aurora_background from "./images/aurora_bg.webp";
import { AppBar, IconButton, Toolbar } from "@mui/material";

const App = () => {
  const { release: releaseWakeLock, request: acquireWakeLock } = useWakeLock();

  const [devDataIsOpen, setDevDataIsOpen] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${aurora_background})`,
        display: "flex",
        flexDirection: "column",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <DevDataModal
            onClose={() => {
              setDevDataIsOpen(false);
            }}
            isOpen={devDataIsOpen}
          >
            <IconButton
              onClick={() => {
                if (displayInfo) {
                  setDevDataIsOpen(!devDataIsOpen);
                }
              }}
            >
              <InfoIcon sx={{ color: "info" }} />
            </IconButton>
          </DevDataModal>
        </Toolbar>
      </AppBar>

      <MeditationTimer
        onComplete={releaseWakeLock}
        onPause={releaseWakeLock}
        onPlay={() => {
          setDisplayInfo(false);
          acquireWakeLock();
        }}
        onReset={() => {
          setDisplayInfo(true);
        }}
        enableEditTimerButtons={Config.meditationTimer.editTimerButtonsEnabled}
      />
    </div>
  );
};

export default App;
