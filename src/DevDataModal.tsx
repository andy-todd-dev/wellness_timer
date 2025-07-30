import React, { ReactNode } from "react";
import { useWakeLock } from "react-screen-wake-lock";
import { Backdrop, Container, Divider, Link, Typography } from "@mui/material";
import Config from "./Config";
import lotus from "./images/lotus.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import { blue, grey } from "@mui/material/colors";

const ModalDivider = () => {
  return <Divider variant="middle" color={grey[50]} />;
};

type ModalLinkProps = {
  children: ReactNode;
  href: string;
};

const ModalLink = ({ children, href }: ModalLinkProps) => (
  <Link href={href} target="_blank" rel="noreferrer" color={blue[500]}>
    {children}
  </Link>
);

type DevDataModalProps = {
  children: ReactNode;
  isOpen: boolean;
};

const DevDataModal = ({ children, isOpen }: DevDataModalProps) => {
  const { isSupported: wakeLockIsSupported } = useWakeLock();
  return (
    <>
      {children}
      <Backdrop
        open={isOpen}
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
          <ModalLink href="https://github.com/andy-todd-dev/wellness_tracker">
            {" "}
            https://github.com/andy-todd-dev/wellness_tracker
          </ModalLink>
          <Typography paragraph sx={{ paddingTop: 5 }}>
            If you have found this app useful and want to support my future
            work:{" "}
            <ModalLink href="https://www.buymeacoffee.com/andytodddev">
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
            </ModalLink>
          </Typography>
          <ModalDivider />
          <div className="credits">
            <ul>
              {[
                {
                  item: "Lotus icons",
                  credit: "Freepik",
                  href: "https://www.flaticon.com/free-icons/lotus",
                  linkText: "Flaticon",
                },
                {
                  item: "Additional sounds",
                  credit: "Joseph Sardin",
                  href: "https://BigSoundBank.com",
                  linkText: "BigSoundBank.com",
                },
              ].map(({ item, credit, href, linkText }, index) => (
                <li key={index}>
                  <Typography variant="body1">
                    {item} by {credit} -{" "}
                    <ModalLink href={href}>{linkText}</ModalLink>
                  </Typography>
                </li>
              ))}
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
