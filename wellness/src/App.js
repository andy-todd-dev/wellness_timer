import "./App.css";
import { useState } from "react";
import MeditationTimer from "./meditationTimer/MeditationTimer";
import { useWakeLock } from "react-screen-wake-lock";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import Config from "./Config";
import DevDataModal from "./DevDataModal";
import background from "./images/water_bg.jpg";

function App() {
  const { release: releaseWakeLock, request: acquireWakeLock } = useWakeLock();

  const [devDataIsOpen, setDevDataIsOpen] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: false,
          backgroundSize: "100% 100%",
        }}
      >
        <DevDataModal
          onClose={() => {
            setDevDataIsOpen(false);
          }}
          isOpen={devDataIsOpen}
        >
          <Icon
            className="burger"
            name="info circle"
            size="large"
            disabled={!displayInfo}
            inverted={!displayInfo}
            onClick={() => {
              setDevDataIsOpen(!devDataIsOpen);
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
