import React, {useState} from "react";
import { useTimer } from "use-timer";
import TimerDisplay from "./TimerDisplay";
import useSound from "use-sound";
import useNoSleep from "use-no-sleep"

import timerFinishedSfx from "../sounds/singingxbowl.wav";

const MeditationTimer = () => {
  
  useNoSleep(true);
  const [play] = useSound(timerFinishedSfx);
  const [initialTime] = useState(20 * 60);
  const { time, start, pause, reset, status } = useTimer({
    initialTime: initialTime,
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
