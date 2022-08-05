import "./App.css";
import { useState } from "react";
import MeditationTimer from "./meditationTimer/MeditationTimer";
import { useWakeLock } from "react-screen-wake-lock";
import InfoIcon from "@mui/icons-material/Info";
import Config from "./Config";
import DevDataModal from "./DevDataModal";
import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";

function App() {
  const { release: releaseWakeLock, request: acquireWakeLock } = useWakeLock();

  const [devDataIsOpen, setDevDataIsOpen] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  const theme = useTheme();

  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: `url(${theme.backgroundImage})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <AppBar color="transparent" elevation={0} sx={{ justifySelf: "start" }}>
          <Toolbar>
            <DevDataModal
              onClose={() => {
                setDevDataIsOpen(false);
              }}
              isOpen={devDataIsOpen}
            >
              <IconButton
                sx={{ visibility: displayInfo ? "visible" : "hidden" }}
                onClick={() => {
                  if (displayInfo) {
                    setDevDataIsOpen(!devDataIsOpen);
                  }
                }}
              >
                <InfoIcon color="primary" />
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
          enableEditTimerButtons={
            Config.meditationTimer.editTimerButtonsEnabled
          }
          sx={{ width: "fit-content", position: "relative", top: "-5vh" }}
        />
      </div>
    </>
  );
}

export default App;
