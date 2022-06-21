import React, { useEffect, useState } from "react";
import TimerDisplay from "./TimerDisplay";
import useSound from "use-sound";
import { Button } from "semantic-ui-react";
import { useTimer } from "use-timer";

import timerFinishedSfx from "../sounds/singingxbowl.wav";

const MeditationTimer = ({ onPause, onPlay, onComplete }) => {
  const [play] = useSound(timerFinishedSfx);

  const [initialTime, setInitialTime] = useState(1200);

  const { time, start, pause, reset, status } = useTimer({
    initialTime: initialTime,
    timerType: "DECREMENTAL",
    onTimeOver: () => {
      play();
      onComplete();
    },
  });

  useEffect(() => {
    reset();
  }, [initialTime, reset]);

  const isRunning = status === "RUNNING";
  const isPaused = status === "PAUSED";
  const isStopped = status === "STOPPED";

  return (
    <div className="meditation-timer">
      <TimerDisplay duration={time} />

      <div
        className={
          isStopped && time > 0 ? "timerButtons" : "timerButtonsRunning"
        }
      >
        {isStopped && time > 0 && (
          <div className="backButtons">
            <Button
              icon="fast backward"
              circular={true}
              onClick={() => {
                setInitialTime(initialTime - 600);
              }}
            />
            <Button
              icon="step backward"
              circular={true}
              onClick={() => {
                setInitialTime(initialTime - 60);
              }}
            />
          </div>
        )}

        <div className="mainButtons">
          {!isRunning && time > 0 && (
            <Button
              icon="play"
              circular={true}
              onClick={() => {
                start();
                onPlay && onPlay();
              }}
            />
          )}
          {isRunning && (
            <Button
              icon="pause"
              circular={true}
              onClick={() => {
                pause();
                onPause && onPause();
              }}
            />
          )}
          {isPaused && <Button onClick={reset} icon="redo" circular={true} />}
        </div>

        {isStopped && time > 0 && (
          <div className="forwardButtons">
            <Button
              icon="step forward"
              circular={true}
              onClick={() => {
                setInitialTime(initialTime + 60);
                // restart(Date.now() / 1000 + time + 60, false);
              }}
            />

            <Button
              icon="fast forward"
              circular={true}
              onClick={() => {
                setInitialTime(initialTime + 600);
                // restart(Date.now() / 1000 + time + 600, false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationTimer;
