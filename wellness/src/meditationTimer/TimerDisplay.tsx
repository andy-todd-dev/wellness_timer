import { Typography } from "@mui/material";
import React from "react";

type TimerDisplayProps = {
  duration: number;
};

const TimerDisplay = ({ duration }: TimerDisplayProps) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  return (
    <div className="timer-display">
      <Typography
        variant="h2"
        component="h1"
        sx={{ margin: 0, textAlign: "center", lineHeight: 1, fontWeight: 500 }}
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
  );
};

export default TimerDisplay;
