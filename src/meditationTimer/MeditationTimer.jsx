import React, { useEffect, useState } from "react";
import TimerDisplay from "./TimerDisplay";
import useSound from "use-sound";
import { useTimer } from "@andy-todd-dev/use-timer";
import { Avatar, Button, Container } from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RefreshIcon from "@mui/icons-material/Refresh";
import FastForwardIcon from "@mui/icons-material/FastForward";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import timerFinishedSfx from "../sounds/bowl_1.flac";

const ButtonAvatar = ({ children, ...props }) => (
  <Avatar sx={{ bgcolor: (theme) => theme.palette.secondary.main }} {...props}>
    {children}
  </Avatar>
);


const MeditationTimer = ({
  onPause,
  onPlay,
  onComplete,
  onReset,
  enableEditTimerButtons,
  sx,
  initialTime,
  onTimeUpdated,
  running = false,
}) => {
  const [play] = useSound(timerFinishedSfx);

  const [currentInitialTime, setCurrentInitialTime] = useState(initialTime);

  const { time, start, pause, reset, status } = useTimer({
    initialTime: currentInitialTime,
    timerType: "DECREMENTAL",
    endTime: 0,
    onTimeOver: () => {
      play();
      onComplete();
    },
  });

  useEffect(() => {
    reset();
  }, [currentInitialTime, reset]);

  const isRunning = status === "RUNNING";
  const isPaused = status === "PAUSED";
  const isStopped = status === "STOPPED";

  const startTimer = () => {
    start();
    onPlay && onPlay();
  };

  useEffect(() => {
    if (running) {
      startTimer();
    }
  }, []);


  return (
    <Container className="meditation-timer" sx={sx}>
      <TimerDisplay duration={time} />

      <div
        className={
          enableEditTimerButtons && isStopped && time > 0
            ? "timerButtons"
            : "timerButtonsRunning"
        }
      >
        {enableEditTimerButtons && isStopped && time > 0 && (
          <div className="backButtons buttonGroup">
            <ButtonAvatar>
              <Button
                onClick={() => {
                  const newTime = currentInitialTime - 600;
                  setCurrentInitialTime(newTime > 60 ? newTime : 60);
                  onTimeUpdated(newTime > 60 ? newTime : 60);
                }}
                disabled={time <= 60}
                aria-label="Decrease timer by 10 minutes"
              >
                <FastRewindIcon fontSize="large" />
              </Button>
            </ButtonAvatar>
            <ButtonAvatar>
              <Button
                onClick={() => {
                  setCurrentInitialTime(currentInitialTime - 60);
                  onTimeUpdated(currentInitialTime - 60);
                }}
                disabled={time <= 60}
                aria-label="Decrease timer by 1 minute"
              >
                <SkipPreviousIcon fontSize="large" />
              </Button>
            </ButtonAvatar>
          </div>
        )}

        <div className="mainButtons buttonGroup">
          {!isRunning && time > 0 && (
            <ButtonAvatar>
              <Button
                onClick={startTimer}
                aria-label="Start timer"
              >
                <PlayArrowIcon fontSize="large" />
              </Button>
            </ButtonAvatar>
          )}
          {isRunning && (
            <ButtonAvatar>
              <Button
                onClick={() => {
                  pause();
                  onPause && onPause();
                }}
                aria-label="Pause timer"
              >
                <PauseIcon fontSize="large" />
              </Button>
            </ButtonAvatar>
          )}
          {(isPaused || (isStopped && time === 0)) && (
            <ButtonAvatar>
              <Button
                onClick={() => {
                  onReset && onReset();
                  reset();
                }}
                aria-label="Reset timer"
              >
                <RefreshIcon fontSize="large" />
              </Button>
            </ButtonAvatar>
          )}
        </div>

        {enableEditTimerButtons && isStopped && time > 0 && (
          <div className="forwardButtons buttonGroup">
            <ButtonAvatar>
              <Button
                onClick={() => {
                  setCurrentInitialTime(currentInitialTime + 60);
                  onTimeUpdated(currentInitialTime + 60);
                }}
                disabled={time >= 99 * 60}
                aria-label="Increase timer by 1 minute"
              >
                <SkipNextIcon fontSize="large" />
              </Button>
            </ButtonAvatar>

            <ButtonAvatar>
              <Button
                onClick={() => {
                  const newTime = currentInitialTime + 600;
                  setCurrentInitialTime(newTime < 99 * 60 ? newTime : 99 * 60);
                  onTimeUpdated(newTime < 99 * 60 ? newTime : 99 * 60);
                }}
                disabled={time >= 99 * 60}
                aria-label="Increase timer by 10 minutes"
              >
                <FastForwardIcon fontSize="large" />
              </Button>
            </ButtonAvatar>
          </div>
        )}
      </div>
    </Container>
  );
};

export default MeditationTimer;
