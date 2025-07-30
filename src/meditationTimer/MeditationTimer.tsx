import React, { useEffect, useState } from "react";
import TimerDisplay from "./TimerDisplay";
import useSound from "use-sound";
import { useTimer } from "react-hook-time";
import { Avatar, Button, Container } from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RefreshIcon from "@mui/icons-material/Refresh";
import FastForwardIcon from "@mui/icons-material/FastForward";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import timerFinishedSfx from "../sounds/bowl_1.flac";

import type { SxProps, Theme } from "@mui/material";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonAvatarProps = {
  children: ReactNode;
} & Omit<React.ComponentProps<typeof Avatar>, "children">;

const ButtonAvatar = ({ children, ...props }: ButtonAvatarProps) => (
  <Avatar sx={{ bgcolor: (theme) => theme.palette.secondary.main }} {...props}>
    {children}
  </Avatar>
);


type MeditationTimerProps = {
  onPause?: () => void;
  onPlay?: () => void;
  onComplete: () => void;
  onReset?: () => void;
  enableEditTimerButtons?: boolean;
  sx?: SxProps<Theme>;
  initialTime: number;
  onTimeUpdated: (newTime: number) => void;
  autorun?: boolean;
  minimumTimeSeconds: number;
  maximumTimeSeconds: number;
};

const MeditationTimer = ({
  onPause,
  onPlay,
  onComplete,
  onReset,
  enableEditTimerButtons,
  sx,
  initialTime,
  onTimeUpdated,
  autorun,
  minimumTimeSeconds,
  maximumTimeSeconds,
}: MeditationTimerProps) => {
  const [play] = useSound(timerFinishedSfx);

  const [currentInitialTime, setCurrentInitialTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

  const { currentTime, start, pause, reset, setTime, isRunning } = useTimer(currentInitialTime, {
    onEnd: () => {
      setIsPaused(false);
      setIsStopped(true);
      play();
      onComplete();
    },
    onPause: () => {
      setIsPaused(true);
      setIsStopped(false);
    },
    onStart: () => {
      setIsPaused(false);
      setIsStopped(false);
    },
    onReset: () => {
      setIsPaused(false);
      setIsStopped(true);
    }
  });

  useEffect(() => {
    setTime(currentInitialTime);
  }, [currentInitialTime]);

  const startTimer = () => {
    start();
    onPlay && onPlay();
  };

  useEffect(() => {
    if (autorun) {
      startTimer();
    }
  }, []);

  const timerUpdateHandlerBuilder = (secondsToChangeBy: number) => {
    return () => {
      const rawNewTime = currentInitialTime + secondsToChangeBy;
      const newTime = Math.min(Math.max(rawNewTime, minimumTimeSeconds), maximumTimeSeconds);
      setCurrentInitialTime(newTime);
      onTimeUpdated(newTime);
    };
  };


  return (
    <Container className="meditation-timer" sx={sx}>
      <TimerDisplay duration={currentTime} />

      <div
        className={
          enableEditTimerButtons && isStopped && currentTime > 0
            ? "timerButtons"
            : "timerButtonsRunning"
        }
      >
        {enableEditTimerButtons && isStopped && currentTime > 0 && (
          <div className="backButtons buttonGroup">
            <ButtonAvatar>
              <Button
                onClick={timerUpdateHandlerBuilder(-600)}
                disabled={currentTime <= 60}
                aria-label="Decrease timer by 10 minutes"
              >
                <FastRewindIcon fontSize="large" />
              </Button>
            </ButtonAvatar>
            <ButtonAvatar>
              <Button
                onClick={timerUpdateHandlerBuilder(-60)}
                disabled={currentTime <= 60}
                aria-label="Decrease timer by 1 minute"
              >
                <SkipPreviousIcon fontSize="large" />
              </Button>
            </ButtonAvatar>
          </div>
        )}

        <div className="mainButtons buttonGroup">
          {!isRunning && currentTime > 0 && (
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
          {(isPaused || (isStopped && currentTime === 0)) && (
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

        {enableEditTimerButtons && isStopped && currentTime > 0 && (
          <div className="forwardButtons buttonGroup">
            <ButtonAvatar>
              <Button
                onClick={timerUpdateHandlerBuilder(60)}
                disabled={currentTime >= 99 * 60}
                aria-label="Increase timer by 1 minute"
              >
                <SkipNextIcon fontSize="large" />
              </Button>
            </ButtonAvatar>

            <ButtonAvatar>
              <Button
                onClick={timerUpdateHandlerBuilder(600)}
                disabled={currentTime >= 99 * 60}
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
