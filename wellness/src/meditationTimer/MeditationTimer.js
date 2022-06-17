import React, { useState } from "react";
import { useTimer } from "use-timer";
import TimerDisplay from "./TimerDisplay";
import useSound from "use-sound";
import { Button } from "semantic-ui-react";

import timerFinishedSfx from "../sounds/singingxbowl.wav";

const MeditationTimer = ({ onPause, onPlay, onComplete }) => {
  const [play] = useSound(timerFinishedSfx);
  const [initialTime] = useState(20 * 60);
  const { time, start, pause, reset, status } = useTimer({
    initialTime: initialTime,
    timerType: "DECREMENTAL",
    endTime: 0,
    onTimeOver: () => {
      play();
      onComplete && onComplete();
    },
  });

  return (
    <div className="meditation-timer">
      <TimerDisplay duration={time} />
      {status !== "RUNNING" && (
        <Button
          onClick={() => {
            start();
            onPlay && onPlay();
          }}
        >
          Start
        </Button>
      )}
      {status === "RUNNING" && (
        <Button
          onClick={() => {
            pause();
            onPause && onPause();
          }}
        >
          Pause
        </Button>
      )}
      {(status === "PAUSED" || time === 0) && (
        <Button onClick={reset}>Reset</Button>
      )}
    </div>
  );
};

export default MeditationTimer;
