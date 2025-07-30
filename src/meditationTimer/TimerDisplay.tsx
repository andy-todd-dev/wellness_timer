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
        variant="timer"
        component="h1"
        color="primary"
        sx={{ margin: 0, textAlign: "center" }}
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
