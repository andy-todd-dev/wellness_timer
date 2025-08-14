import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import OptionsModal from "../OptionsModal";
import SettingsIcon from "@mui/icons-material/Settings";
import { isTouchScreen } from "../detectTouchScreen";
import { InstallDesktop, InstallMobile } from "@mui/icons-material";

interface TimerAppBarProps {
  updateCurrentThemeName?: (themeName: string) => void;
  showButtons: boolean;
}

const TimerAppBar: React.FC<TimerAppBarProps> = ({
  updateCurrentThemeName,
  showButtons,
}) => {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const onBeforeInstallPrompt: EventListener = (e: any) => {
      e.preventDefault?.(); // Prevent Chrome 67+ from automatically showing the prompt
      setDeferredInstallPrompt(e);
      setCanInstall(true);
    };

    const onAppInstalled: EventListener = () => {
      setDeferredInstallPrompt(null);
      setCanInstall(false);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        onBeforeInstallPrompt as EventListener
      );
      window.removeEventListener(
        "appinstalled",
        onAppInstalled as EventListener
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredInstallPrompt) return;
    try {
      deferredInstallPrompt.prompt();
      // Wait for the user's choice
      await deferredInstallPrompt.userChoice;
    } catch (err) {
      // ignore errors from prompt
    } finally {
      // Always clear the prompt as it can't be reused.
      // 'beforeinstallprompt' will refire if they did not install
      setDeferredInstallPrompt(null);
      setCanInstall(false);
    }
  };
  return (
    <AppBar color="transparent" elevation={0} sx={{ justifySelf: "start" }}>
      <Toolbar>
        <div style={{ flexGrow: 1 }} />

        {showButtons && (
          // {showButtons && canInstall && deferredInstallPrompt && (
          <IconButton
            sx={{ zIndex: "tooltip", mr: 1 }}
            onClick={handleInstallClick}
            aria-label="Install app"
            title="Install app"
          >
            {isTouchScreen ? (
              <InstallMobile color="primary" />
            ) : (
              <InstallDesktop color="primary" />
            )}
          </IconButton>
        )}

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
