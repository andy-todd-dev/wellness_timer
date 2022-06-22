import "./App.css";
import { useState } from "react";
import MeditationTimer from "./meditationTimer/MeditationTimer";
import { useWakeLock } from "react-screen-wake-lock";
import "semantic-ui-css/semantic.min.css";
import DevDataModal from "./DevDataModal";
import { Button } from "semantic-ui-react";
import Config from "./Config";

function App() {
  const {
    isSupported,
    release: releaseWakeLock,
    request: acquireWakeLock,
  } = useWakeLock();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <MeditationTimer
        onComplete={releaseWakeLock}
        onPause={releaseWakeLock}
        onPlay={acquireWakeLock}
        enableEditTimerButtons={Config.meditationTimer.editTimerButtonsEnabled}
      />
      <DevDataModal
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        wakeLockIsSupported={isSupported}
        buildName={Config.buildName}
      >
        <div className="devDataButton">
          <Button icon="info" size="tiny" onClick={() => setIsOpen(true)} />
        </div>
      </DevDataModal>
    </div>
  );
}

export default App;
