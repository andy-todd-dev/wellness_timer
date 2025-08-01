import { Typography } from "@mui/material";
import React from "react";
import { useSwipeable } from "react-swipeable";

type TimerDisplayProps = {
  duration: number;
  onDurationChange?: (newDuration: number) => void;
};

const TimerDisplay = ({ duration, onDurationChange }: TimerDisplayProps) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  // Helper function to handle digit swipe
  const handleDigitSwipeBuilder =
    ({
      min,
      max,
      currentValue,
      increment,
      secondsMultiplier,
    }: {
      min: number;
      max: number;
      currentValue: number;
      increment: number;
      secondsMultiplier: number;
    }) =>
    () => {
      const currentSeconds = currentValue * secondsMultiplier;
      const rawNewValue = currentValue + increment;
      const newValue =
        rawNewValue < min ? max : rawNewValue > max ? min : rawNewValue;
      const newSeconds = newValue * secondsMultiplier;
      const difference = newSeconds - currentSeconds;
      onDurationChange && onDurationChange(duration + difference);
    };

  const SwipeableDigit = ({
    value,
    max,
    secondsMultiplier,
    label,
  }: {
    value: number;
    max: number;
    secondsMultiplier: number;
    label: string;
  }) => {
    const handlers = useSwipeable({
      onSwipedUp: handleDigitSwipeBuilder({
        min: 0,
        max: max,
        currentValue: value,
        increment: 1,
        secondsMultiplier: secondsMultiplier,
      }),
      onSwipedDown: handleDigitSwipeBuilder({
        min: 0,
        max: max,
        currentValue: value,
        increment: -1,
        secondsMultiplier: secondsMultiplier,
      }),
      trackMouse: true,
      preventScrollOnSwipe: true,
    });

    return (
      <span
        {...handlers}
        aria-label={label}
        role="spinbutton"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={onDurationChange ? 0 : -1}
        style={{
          cursor: onDurationChange ? "pointer" : "default",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        {value}
      </span>
    );
  };

  const minutesTens = Math.floor(minutes / 10);
  const minutesOnes = minutes % 10;
  const secondsTens = Math.floor(seconds / 10);
  const secondsOnes = seconds % 10;
  return (
    <div
      className="timer-display"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        className="timer-outer-circle"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          boxShadow: "0 4px 32px rgba(0,0,0,0.52)",
          overflow: "hidden",
          aspectRatio: "1 / 1",
          width: "fit-content",
          height: "fit-content",
        }}
      >
        {/* Blurred outer ring - only visible in the ring area */}
        <div
          className="timer-mask"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.1)",
            mask: "radial-gradient(circle at center, transparent 65%, black 35%)",
            WebkitMask:
              "radial-gradient(circle at center, transparent 65%, black 35%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="timer-inner-circle"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.15)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.12)",
            zIndex: 1,
            backdropFilter: "blur(1.5px)",
            padding: "1.2em",
            aspectRatio: "1 / 1",
            margin: "0.5em",
          }}
        >
          <Typography
            variant="timer"
            component="h1"
            color="primary"
            sx={{
              fontSize: "clamp(3rem, min(30vw, 25vh), 8rem)",
              margin: 0,
              textAlign: "center",
              fontWeight: 500,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            <SwipeableDigit
              value={minutesTens}
              max={9}
              secondsMultiplier={600}
              label="Tens of minutes digit"
            />
            <SwipeableDigit
              value={minutesOnes}
              max={9}
              secondsMultiplier={60}
              label="Ones of minutes digit"
            />
            :
            <SwipeableDigit
              value={secondsTens}
              max={5}
              secondsMultiplier={10}
              label="Tens of seconds digit"
            />
            <SwipeableDigit
              value={secondsOnes}
              max={9}
              secondsMultiplier={1}
              label="Ones of seconds digit"
            />
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
