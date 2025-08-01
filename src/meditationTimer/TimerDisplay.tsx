import { Typography } from "@mui/material";
import React from "react";

type TimerDisplayProps = {
  duration: number;
};

const TimerDisplay = ({ duration }: TimerDisplayProps) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
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
            {minutes.toLocaleString(undefined, {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            :
            {seconds.toLocaleString(undefined, {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
