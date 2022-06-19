import React from "react";

const TimerDisplay = ({ duration }) => {

  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  return (
    <div className="timer-display">
      <h1> 
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
