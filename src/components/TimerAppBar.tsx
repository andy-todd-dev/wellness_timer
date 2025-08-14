import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import OptionsModal from "../OptionsModal";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";

interface TimerAppBarProps {
  updateCurrentThemeName?: (themeName: string) => void;
  showButtons: boolean;
}

const TimerAppBar: React.FC<TimerAppBarProps> = ({
  updateCurrentThemeName,
  showButtons,
}) => {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const theme = useTheme();
  return (
    <AppBar color="transparent" elevation={0} sx={{ justifySelf: "start" }}>
      <Toolbar>
        <div style={{ flexGrow: 1 }} />

        <OptionsModal
          isOpen={optionsIsOpen}
          onClose={() => setOptionsIsOpen(false)}
          updateCurrentThemeName={updateCurrentThemeName || (() => {})}
        >
          {showButtons && (
            <IconButton
              sx={{ zIndex: "tooltip" }}
              onClick={() => {
                setOptionsIsOpen(!optionsIsOpen);
              }}
              aria-label="Open settings"
            >
              <SettingsIcon color="primary" />
            </IconButton>
          )}
        </OptionsModal>
      </Toolbar>
    </AppBar>
  );
};

export default TimerAppBar;
