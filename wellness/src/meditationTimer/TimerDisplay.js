import React from "react";
import useFitText from "use-fit-text";

const TimerDisplay = ({ duration }) => {
  const { fontSize, ref } = useFitText();

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
