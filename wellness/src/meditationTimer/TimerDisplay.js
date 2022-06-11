import React from "react";

const TimerDisplay = ({ duration }) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration - (hours * 3600 + minutes * 60);
  return (
    <div className="timer-display">
      <h1>
        {hours.toLocaleString(undefined, {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        :
        {minutes.toLocaleString(undefined, {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        :
        {seconds.toLocaleString(undefined, {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </h1>
    </div>
  );
};

export default TimerDisplay;
