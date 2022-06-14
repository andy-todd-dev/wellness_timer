import React from "react";
import { useTimer } from "use-timer";
import TimerDisplay from "./TimerDisplay";
import useSound from "use-sound";

import timerFinishedSfx from "../sounds/singingxbowl.wav";

const MeditationTimer = () => {
  const [play] = useSound(timerFinishedSfx);

  const { time, start, pause, reset, status } = useTimer({
    initialTime: 20 * 60,
    timerType: "DECREMENTAL",
    endTime: 0,
    onTimeOver: play,
  });

  return (
    <div className="meditation-timer">
      <TimerDisplay duration={time} />
      {status !== "RUNNING" && <button onClick={start}>Start</button>}
      {status === "RUNNING" && <button onClick={pause}>Pause</button>}
      {(status === "PAUSED" || time === 0) && (
        <button onClick={reset}>Reset</button>
      )}
    </div>
  );
};

export default MeditationTimer;
