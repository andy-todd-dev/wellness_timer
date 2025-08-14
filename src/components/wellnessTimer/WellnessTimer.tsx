import React, { useEffect, useState } from "react";
import TimerDisplay from "./TimerDisplay";
import useSound from "use-sound";
import { useTimer } from "react-hook-time";
import { Container } from "@mui/material";

import timerFinishedSfx from "../../sounds/bowl_1.flac";

import type { SxProps, Theme } from "@mui/material";
import PlayPauseButton from "./PlayPauseButton";
import { useWakeLock } from "react-screen-wake-lock";
import Config from "../../Config";
import useLocalStorage from "use-local-storage";

type WellnessTimerProps = {
  onPlay?: () => void;
  onReset?: () => void;
  onPause?: () => void;
  sx?: SxProps<Theme>;
  initialTime?: number;
  autorun?: boolean;
  enableSwipeToUpdate: boolean;
  enableButtonsToUpdate: boolean;
  forceNoToolTip?: boolean;
};

const WellnessTimer = ({
  onPlay,
  onReset,
  onPause,
  sx,
  initialTime = Config.meditationTimer.defaultTimerSeconds,
  autorun = false,
  enableSwipeToUpdate,
  enableButtonsToUpdate,
  forceNoToolTip = false,
}: WellnessTimerProps) => {
  const { release: releaseWakeLock, request: acquireWakeLock } = useWakeLock();
  const [play] = useSound(timerFinishedSfx);
  const [toolTipAlreadySeen, setToolTipAlreadySeen] = useLocalStorage(
    "toolTipAlreadySeen",
    false
  );
  const showToolTip =
    !forceNoToolTip && !toolTipAlreadySeen && enableSwipeToUpdate;

  const [currentInitialTime, setCurrentInitialTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

  const { currentTime, start, pause, reset, setTime, isRunning } = useTimer(
    currentInitialTime,
    {
      onEnd: () => {
        setIsPaused(false);
        setIsStopped(true);
        play();
        releaseWakeLock();
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
      },
    }
  );

  useEffect(() => {
    setTime(currentInitialTime);
  }, [currentInitialTime]);

  const startTimer = () => {
    start();
    acquireWakeLock();
    onPlay && onPlay();
  };

  useEffect(() => {
    if (autorun) {
      startTimer();
    }
  }, []);

  const handleTimerDisplayChange = (newDuration: number) => {
    const clampedDuration = Math.min(
      Math.max(newDuration, Config.meditationTimer.minimumTimerSeconds),
      Config.meditationTimer.maximumTimerSeconds
    );
    setCurrentInitialTime(clampedDuration);
  };

  return (
    <Container className="meditation-timer" sx={sx}>
      <TimerDisplay
        duration={currentTime}
        enableSwipeToUpdate={enableSwipeToUpdate && isStopped}
        enableButtonsToUpdate={enableButtonsToUpdate && isStopped}
        onDurationChange={(newDuration: number) => {
          if (isStopped && currentTime > 0) {
            handleTimerDisplayChange(newDuration);
          }
          setToolTipAlreadySeen(true);
        }}
        showToolTip={showToolTip}
        onDigitClick={() => {
          setToolTipAlreadySeen(true);
        }}
        showResetButton={isPaused || (isStopped && currentTime === 0)}
        onReset={() => {
          onReset && onReset();
          reset();
        }}
      />

      <PlayPauseButton
        currentTime={currentTime}
        isRunning={isRunning}
        onPlay={() => {
          onPlay && onPlay();
          startTimer();
        }}
        onPause={() => {
          onPause && onPause();
          pause();
          releaseWakeLock();
        }}
      />
    </Container>
  );
};

export default WellnessTimer;
