import React, { useEffect } from "react";
import useLocalStorage from "use-local-storage";
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
}) => {
  const [play] = useSound(timerFinishedSfx);

  const [initialTime, setInitialTime] = useLocalStorage(
    "timer-initial-time",
    1200
  );

  const { time, start, pause, reset, status } = useTimer({
    initialTime,
    timerType: "DECREMENTAL",
    endTime: 0,
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
                  const newTime = initialTime - 600;
                  setInitialTime(newTime > 60 ? newTime : 60);
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
                  setInitialTime(initialTime - 60);
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
                onClick={() => {
                  start();
                  onPlay && onPlay();
                }}
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
                  setInitialTime(initialTime + 60);
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
                  const newTime = initialTime + 600;
                  setInitialTime(newTime < 99 * 60 ? newTime : 99 * 60);
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
