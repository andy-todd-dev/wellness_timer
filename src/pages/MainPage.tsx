import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import OptionsModal from "../OptionsModal";
import WellnessTimer from "../components/wellnessTimer/WellnessTimer";
import {
  getParameter,
  parseBoolean,
  parseDurationAsSeconds,
} from "../requestParamsParsing";
import { isTouchScreen } from "../detectTouchScreen";

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
  const [displayInfo, setDisplayInfo] = useState(true);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

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
      <AppBar color="transparent" elevation={0} sx={{ justifySelf: "start" }}>
        <Toolbar>
          <div style={{ flexGrow: 1 }} />

          <OptionsModal
            isOpen={optionsIsOpen}
            onClose={() => setOptionsIsOpen(false)}
            updateCurrentThemeName={updateCurrentThemeName || (() => {})}
            currentThemeName={theme.name}
          >
            <IconButton
              sx={{ zIndex: "tooltip" }}
              onClick={() => {
                if (displayInfo) {
                  setOptionsIsOpen(!optionsIsOpen);
                }
              }}
            >
              <SettingsIcon color="secondary" />
            </IconButton>
          </OptionsModal>
        </Toolbar>
      </AppBar>

      <WellnessTimer
        onPlay={() => {
          setDisplayInfo(false);
        }}
        onReset={() => {
          setDisplayInfo(true);
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
