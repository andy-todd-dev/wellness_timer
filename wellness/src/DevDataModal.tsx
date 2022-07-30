import React from "react";
import { useWakeLock } from "react-screen-wake-lock";
import { Backdrop, Container, Divider, Link, Typography } from "@mui/material";
import Config from "./Config";
import lotus from "./images/lotus.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import { grey } from "@mui/material/colors";

const ModalDivider = () => {
  return <Divider variant="middle" color={grey[50]} />;
};

type DevDataModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const DevDataModal = ({ children, isOpen, onClose }: DevDataModalProps) => {
  const { isSupported: wakeLockIsSupported } = useWakeLock();
  return (
    <>
      {children}
      <Backdrop
        open={isOpen}
        onClick={onClose}
        sx={{
          backgroundColor: "rgb(0, 0, 0, 0.90)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          overflow: "scroll",
        }}
      >
        <Container sx={{ textAlign: "center", color: grey[50] }}>
          <Typography variant="h3" component="h1">
            Wellness Timer
          </Typography>
          <img className="logo" src={lotus} alt="Logo" />
          <GitHubIcon />
          <Link
            href="https://github.com/andy-todd-dev/wellness_tracker"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            https://github.com/andy-todd-dev/wellness_tracker
          </Link>
          <Typography paragraph sx={{ paddingTop: 5 }}>
            If you have found this app useful and want to support my future
            work:{" "}
            <Link
              href="https://www.buymeacoffee.com/andytodddev"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                style={{
                  height: 40,
                  margin: "auto",
                  display: "block",
                  paddingTop: 5,
                }}
              />
            </Link>
          </Typography>
          <ModalDivider />
          <div className="credits">
            <ul>
              <li>
                Lotus icons created by Freepik -{" "}
                <Link
                  href="https://www.flaticon.com/free-icons/lotus"
                  title="lotus icons"
                  target="_blank"
                  rel="noreferrer"
                >
                  Flaticon
                </Link>
              </li>
              <li>
                Additional sounds: Joseph SARDIN -{" "}
                <Link
                  href="https://BigSoundBank.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  BigSoundBank.com
                </Link>
              </li>
            </ul>
          </div>
          <div className="dev-values">
            <ModalDivider />
            <span>
              <b>Build:</b> {Config.buildName}
            </span>
            <span>
              <b>Wake lock:</b>{" "}
              {wakeLockIsSupported ? "supported" : "not supported"}
            </span>
          </div>
        </Container>
      </Backdrop>
    </>
  );
};

export default DevDataModal;
