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
import { isTouchScreen } from "./detectTouchScreen";

const SECONDS_PER_MINUTE = 60;
const DEFAULT_TIMER_SECONDS = 20 * SECONDS_PER_MINUTE; // 20 minutes
const MAXIMUM_TIMER_SECONDS = 99 * SECONDS_PER_MINUTE; // 60 minutes
const MINIMUM_TIMER_SECONDS = 1 * SECONDS_PER_MINUTE; // 1 minute

const getParameter = <T,>(
  parse: (value: string) => T,
  name: string,
  defaultValue: T
): T => {
  try {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(name);
    if (value != null) {
      return parse(value);
    }
  } catch (e) {
    console.error(`Error parsing ${name} parameter:`, e);
  }
  return defaultValue;
};

const parseBoolean = (value: string): boolean =>
  value === "true" || value === "1";

const getInitialTimeParameter = (): number =>
  getParameter(
    (value) => {
      const seconds = toSeconds(parseISODuration(value));
      return seconds > 0 ? seconds : DEFAULT_TIMER_SECONDS;
    },
    "initialTime",
    DEFAULT_TIMER_SECONDS
  );

const getRunningParameter = (): boolean =>
  getParameter(parseBoolean, "running", false);

const getForceSwipeParameter = (): boolean =>
  getParameter(parseBoolean, "forceSwipe", false);

const getForceButtonsParameter = (): boolean =>
  getParameter(parseBoolean, "forceButtons", false);

const getForceNoToolTipParameter = (): boolean =>
  getParameter(parseBoolean, "forceNoToolTip", false);

function App() {
  const { release: releaseWakeLock, request: acquireWakeLock } = useWakeLock();

  const [devDataIsOpen, setDevDataIsOpen] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  const theme = useTheme();

  const [storedInitialTime, setStoredInitialTime] = useLocalStorage(
    "timer-initial-time",
    DEFAULT_TIMER_SECONDS
  );
  const [toolTipAlreadySeen, setToolTipAlreadySeen] = useLocalStorage(
    "toolTipAlreadySeen",
    false
  );
  const initialTimeFromParam = getInitialTimeParameter();
  const runningFromParam = getRunningParameter();
  const forceSwipe = getForceSwipeParameter();
  const forceButtons = getForceButtonsParameter();
  const forceNoToolTip = getForceNoToolTipParameter();

  const enableSwipeToUpdate = forceSwipe || isTouchScreen;
  const showToolTip =
    !forceNoToolTip && !toolTipAlreadySeen && enableSwipeToUpdate;

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
          enableSwipeToUpdate={enableSwipeToUpdate}
          enableButtonsToUpdate={forceButtons || !isTouchScreen}
          showToolTip={showToolTip}
          onToolTipClose={() => {
            setToolTipAlreadySeen(true);
          }}
        />
      </div>
    </>
  );
}

export default App;
