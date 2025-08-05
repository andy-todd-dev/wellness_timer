import { Tooltip, Typography } from "@mui/material";
import React from "react";
import { useSwipeable } from "react-swipeable";
import useLocalStorage from "use-local-storage";

type TimerDisplayProps = {
  duration: number;
  enableSwipeToUpdate: boolean;
  enableButtonsToUpdate: boolean;
  onDurationChange?: (newDuration: number) => void;
};

const TimerDisplay = ({
  duration,
  enableSwipeToUpdate,
  enableButtonsToUpdate,
  onDurationChange,
}: TimerDisplayProps) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  // State for tooltip visibility
  const [toolTipAlreadySeen, setToolTipAlreadySeen] = useLocalStorage(
    "toolTipAlreadySeen",
    false
  );
  const showToolTip = !toolTipAlreadySeen && enableSwipeToUpdate;

  const handleTooltipClose = () => {
    setToolTipAlreadySeen(true);
  };

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

  const ArrowButton = ({
    onClick,
    arrow,
    label,
    top = undefined,
    bottom = undefined,
  }: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    arrow: React.ReactNode;
    label: string;
    top?: string;
    bottom?: string;
  }) => {
    return (
      <button
        onClick={onClick}
        aria-label={label}
        style={{
          position: "absolute",
          top: top,
          bottom: bottom,
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.1em",
          opacity: 0.3,
          transition: "opacity 0.2s ease",
          fontSize: "0.2em",
          color: "inherit",
          zIndex: 2,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
        onMouseDown={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseUp={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {arrow}
      </button>
    );
  };

  const SwipeableDigit = ({
    value,
    max,
    secondsMultiplier,
    label,
    showToolTip = false,
  }: {
    value: number;
    max: number;
    secondsMultiplier: number;
    label: string;
    showToolTip?: boolean;
  }) => {
    const handleIncrement = handleDigitSwipeBuilder({
      min: 0,
      max: max,
      currentValue: value,
      increment: 1,
      secondsMultiplier: secondsMultiplier,
    });

    const handleDecrement = handleDigitSwipeBuilder({
      min: 0,
      max: max,
      currentValue: value,
      increment: -1,
      secondsMultiplier: secondsMultiplier,
    });

    const handlers = useSwipeable({
      onSwipedUp: handleIncrement,
      onSwipedDown: handleDecrement,
      trackMouse: true,
      preventScrollOnSwipe: true,
    });

    return (
      <Tooltip
        title="Swipe up/down to adjust time"
        open={showToolTip}
        onClick={handleTooltipClose}
        onClose={handleTooltipClose}
        arrow
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "rgba(0, 0, 0, 0.8)",
              fontSize: "0.875rem",
              backdropFilter: "blur(8px)",
            },
          },
          arrow: {
            sx: {
              color: "rgba(0, 0, 0, 0.8)",
            },
          },
        }}
      >
        <span
          style={{
            position: "relative",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          {onDurationChange && enableButtonsToUpdate && (
            <ArrowButton
              onClick={handleIncrement}
              arrow="▲"
              label={`Increase ${label}`}
              top="-0.8em"
            />
          )}

          <span
            {...(enableSwipeToUpdate ? handlers : {})}
            aria-label={label}
            role="spinbutton"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={value}
            tabIndex={onDurationChange ? 0 : -1}
            style={{
              cursor: onDurationChange ? "pointer" : "default",
              userSelect: "none",
              position: "relative",
              zIndex: 1,
            }}
            onClick={showToolTip ? handleTooltipClose : undefined}
          >
            {value}
          </span>

          {onDurationChange && enableButtonsToUpdate && (
            <ArrowButton
              onClick={handleDecrement}
              arrow="▼"
              label={`Decrease ${label}`}
              bottom="-0.8em"
            />
          )}
        </span>
      </Tooltip>
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
        touchAction: "none",
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
              showToolTip={showToolTip}
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
