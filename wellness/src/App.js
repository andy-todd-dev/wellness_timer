import "./App.css";
import MeditationTimer from "./meditationTimer/MeditationTimer";

function App() {
  return (
    <div className="App">
      <MeditationTimer />
      <p style={{ fontSize: 8 }}>
        Build: {process.env.REACT_APP_BUILD || "dev"}
      </p>
    </div>
  );
}

export default App;
