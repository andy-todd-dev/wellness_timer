import "./App.css";
import { useState } from "react";
import MeditationTimer from "./meditationTimer/MeditationTimer";
import useLocalStorage from "use-local-storage";
import { parse as parseISODuration, toSeconds } from "iso8601-duration";
import { useWakeLock } from "react-screen-wake-lock";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import Config from "./Config";
import DevDataModal from "./DevDataModal";
import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";

const SECONDS_PER_MINUTE = 60;
const DEFAULT_TIMER_SECONDS = 20 * SECONDS_PER_MINUTE; // 20 minutes

function App() {
  const { release: releaseWakeLock, request: acquireWakeLock } = useWakeLock();

  const [devDataIsOpen, setDevDataIsOpen] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  const theme = useTheme();

  // Get initialTime param from URL and parse as ISO 8601 duration using iso8601-duration
  let initialTimeFromParam = null;
  let runningFromParam = false;
  try {
    const params = new URLSearchParams(window.location.search);
    const initialTimeParam = params.get("initialTime");
    if (initialTimeParam) {
      const durationObj = parseISODuration(initialTimeParam);
      const seconds = toSeconds(durationObj);
      if (seconds && seconds > 0) {
        initialTimeFromParam = seconds;
      }
    }
    const runningParam = params.get("running");
    if (runningParam && (runningParam === "true" || runningParam === "1")) {
      runningFromParam = true;
    }
  } catch (e) {
    // ignore
  }

  // Always call useLocalStorage at the top level
  const [storedInitialTime, setStoredInitialTime] = useLocalStorage("timer-initial-time", DEFAULT_TIMER_SECONDS);
  // Use the URL param if present, otherwise use local storage
  console.log("Initial time from URL param:", initialTimeFromParam);
  console.log("Stored initial time from local storage:", storedInitialTime);
  const initialTime = initialTimeFromParam !== null ? initialTimeFromParam : storedInitialTime;
  console.log("Using initial time:", initialTime);

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
                sx={{ zIndex: "tooltip" }}
                onClick={() => {
                  if (displayInfo) {
                    setDevDataIsOpen(!devDataIsOpen);
                  }
                }}
              >
                {!devDataIsOpen && <InfoIcon color="secondary" />}
                {devDataIsOpen && <CloseIcon color="secondary" />}
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
          initialTime={initialTime}
          running={runningFromParam}
          onTimeUpdated={setStoredInitialTime}
          sx={{ width: "fit-content", position: "relative", top: "-5vh" }}
        />
      </div>
    </>
  );
}

export default App;
