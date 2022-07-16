import "./App.css";
import { useState } from "react";
import MeditationTimer from "./meditationTimer/MeditationTimer";
import { useWakeLock } from "react-screen-wake-lock";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import Config from "./Config";
import DevDataModal from "./DevDataModal";
// import water_background from "./images/water_bg.webp";
import aurora_background from "./images/aurora_bg.webp";

function App() {
  const { release: releaseWakeLock, request: acquireWakeLock } = useWakeLock();

  const [devDataIsOpen, setDevDataIsOpen] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: `url(${aurora_background})`,
        }}
      >
        <DevDataModal
          onClose={() => {
            setDevDataIsOpen(false);
          }}
          isOpen={devDataIsOpen}
        >
          <Icon
            className={`burger ${displayInfo ? "" : "hidden"}`}
            name="info circle"
            link={true}
            size="large"
            onClick={() => {
              if (displayInfo) {
                setDevDataIsOpen(!devDataIsOpen);
              }
            }}
          />
        </DevDataModal>
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
        />
      </div>
    </>
  );
}

export default App;
