import "./App.css";
import { useRef, useState } from "react";
import MeditationTimer from "./meditationTimer/MeditationTimer";
import { useWakeLock } from "react-screen-wake-lock";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon, Ref } from "semantic-ui-react";
import Config from "./Config";
import UserMenu from "./menu/UserMenu";

function App() {
  const { release: releaseWakeLock, request: acquireWakeLock } = useWakeLock();

  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const mainRef = useRef();

  return (
    <>
      <UserMenu
        direction={"left"}
        animation={"overlay"}
        visible={menuIsVisible}
        closeOnClick={mainRef}
        onHide={() => setMenuIsVisible(false)}
      />
      <Ref innerRef={mainRef}>
        <div className="App">
          <Icon
            // as={"div"}
            className="burger"
            name="bars"
            size="large"
            onClick={() => {
              setMenuIsVisible(!menuIsVisible);
            }}
          />
          <MeditationTimer
            onComplete={releaseWakeLock}
            onPause={releaseWakeLock}
            onPlay={acquireWakeLock}
            enableEditTimerButtons={
              Config.meditationTimer.editTimerButtonsEnabled
            }
          />
        </div>
      </Ref>
    </>
  );
}

export default App;
