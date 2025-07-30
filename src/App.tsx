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
const MAXIMUM_TIMER_SECONDS = 99 * SECONDS_PER_MINUTE; // 60 minutes
const MINIMUM_TIMER_SECONDS = 1 * SECONDS_PER_MINUTE; // 1 minute

const getInitialTimeParameter = (): number => {
  try {
    const params = new URLSearchParams(window.location.search);
    const initialTimeParam = params.get("initialTime");
    if (initialTimeParam) {
      const durationObj = parseISODuration(initialTimeParam);
      const seconds = toSeconds(durationObj);
      if (seconds && seconds > 0) {
        return seconds;
      }
    }
  } catch (e) {
    console.error("Error parsing initialTime parameter:", e);
  }
  return DEFAULT_TIMER_SECONDS;
};

const getRunningParameter = (): boolean => {
  try {
    const params = new URLSearchParams(window.location.search);
    const runningParam = params.get("running");
    if (runningParam === "true" || runningParam === "1") {
      return true;
    }
  } catch (e) {
    console.error("Error parsing running parameter:", e);
  }
  return false;
};

function App() {
  const { release: releaseWakeLock, request: acquireWakeLock } = useWakeLock();

  const [devDataIsOpen, setDevDataIsOpen] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  const theme = useTheme();

  const [storedInitialTime, setStoredInitialTime] = useLocalStorage(
    "timer-initial-time",
    DEFAULT_TIMER_SECONDS
  );
  const initialTimeFromParam = getInitialTimeParameter();
  const runningFromParam = getRunningParameter();

  // The URL overrides the local storage value if present
  const initialTime =
    initialTimeFromParam !== null ? initialTimeFromParam : storedInitialTime;

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
            <DevDataModal isOpen={devDataIsOpen}>
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
          autorun={runningFromParam}
          onTimeUpdated={setStoredInitialTime}
          sx={{ width: "fit-content", position: "relative", top: "-5vh" }}
          minimumTimeSeconds={MINIMUM_TIMER_SECONDS}
          maximumTimeSeconds={MAXIMUM_TIMER_SECONDS}
        />
      </div>
    </>
  );
}

export default App;
