import React, { useState } from "react";
import { useTheme } from "@mui/material";
import WellnessTimer from "../components/wellnessTimer/WellnessTimer";
import {
  getParameter,
  parseBoolean,
  parseDurationAsSeconds,
} from "../requestParamsParsing";
import { isTouchScreen } from "../detectTouchScreen";
import TimerAppBar from "../components/TimerAppBar";

const getInitialTimeParameter = (): number | undefined =>
  getParameter<number | undefined>(
    parseDurationAsSeconds,
    "initialTime",
    undefined
  );

const getRunningParameter = (): boolean =>
  getParameter(parseBoolean, "running", false);

const getForceSwipeParameter = (): boolean =>
  getParameter(parseBoolean, "forceSwipe", false);

const getForceButtonsParameter = (): boolean =>
  getParameter(parseBoolean, "forceButtons", false);

const getForceNoToolTipParameter = (): boolean =>
  getParameter(parseBoolean, "forceNoToolTip", false);

interface MainPageProps {
  updateCurrentThemeName: (themeName: string) => void;
}

const MainPage = ({ updateCurrentThemeName }: MainPageProps) => {
  const theme = useTheme();
  const [showButtons, setShowButtons] = useState(true);

  const initialTimeFromParam = getInitialTimeParameter();
  const runningFromParam = getRunningParameter();
  const forceSwipe = getForceSwipeParameter();
  const forceButtons = getForceButtonsParameter();
  const forceNoToolTip = getForceNoToolTipParameter();

  const enableSwipeToUpdate = forceSwipe || isTouchScreen;
  const enableButtonsToUpdate = forceButtons || !isTouchScreen;

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${theme.backgroundImage})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <TimerAppBar
        updateCurrentThemeName={updateCurrentThemeName}
        showButtons={showButtons}
      />

      <WellnessTimer
        onPlay={() => {
          setShowButtons(false);
        }}
        onReset={() => {
          setShowButtons(true);
        }}
        initialTime={initialTimeFromParam}
        autorun={runningFromParam}
        sx={{ width: "fit-content", position: "relative", top: "-10vh" }}
        enableSwipeToUpdate={enableSwipeToUpdate}
        enableButtonsToUpdate={enableButtonsToUpdate}
        forceNoToolTip={forceNoToolTip}
      />
    </div>
  );
};

export default MainPage;
