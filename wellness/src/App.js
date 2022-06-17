import "./App.css";
import MeditationTimer from "./meditationTimer/MeditationTimer";
import { useWakeLock } from "react-screen-wake-lock";

function App() {
  const {
    isSupported,
    release: releaseWakeLock,
    request: acquireWakeLock,
  } = useWakeLock();

  return (
    <div className="App">
      <MeditationTimer
        onComplete={releaseWakeLock}
        onPause={releaseWakeLock}
        onPlay={acquireWakeLock}
      />
      <table className="devData">
        <tbody>
          <tr>
            <th>Build</th>
            <td>
              {(process.env.REACT_APP_BUILD &&
                process.env.REACT_APP_BUILD.substring(0, 5)) ||
                "dev"}
            </td>
          </tr>
          <tr>
            <th>Wake lock</th>
            <td>{isSupported ? "supported" : "not supported"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
