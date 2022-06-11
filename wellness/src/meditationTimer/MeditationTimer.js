import React from "react";
import { useTimer } from "use-timer";
import TimerDisplay from "./TimerDisplay";

const MeditationTimer = () => {
  const { time } = useTimer({
    initialTime: 20 * 60,
    timerType: "DECREMENTAL",
    autostart: true,
    endTime: 0,
  });

  return (
    <div className="meditation-timer">
      <TimerDisplay duration={time} />
    </div>
  );
};

export default MeditationTimer;
