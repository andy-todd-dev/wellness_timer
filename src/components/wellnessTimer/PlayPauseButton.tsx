import React, { ReactNode } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

type ButtonAvatarProps = {
  children: ReactNode;
} & Omit<React.ComponentProps<typeof Avatar>, "children">;

const ButtonAvatar = ({ children, ...props }: ButtonAvatarProps) => (
  <Avatar sx={{ bgcolor: "primary.main" }} {...props}>
    {children}
  </Avatar>
);
const PlayPauseButton = ({
  currentTime,
  isRunning,
  onPlay,
  onPause,
}: {
  currentTime: number;
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
}) => {
  return (
    <div className={"timerButtons"}>
      <div className="mainButtons buttonGroup">
        {!isRunning && currentTime > 0 && (
          <ButtonAvatar>
            <Button onClick={onPlay} aria-label="Start timer">
              <PlayArrowIcon fontSize="large" color="secondary" />
            </Button>
          </ButtonAvatar>
        )}
        {isRunning && (
          <ButtonAvatar>
            <Button onClick={onPause} aria-label="Pause timer">
              <PauseIcon fontSize="large" />
            </Button>
          </ButtonAvatar>
        )}
      </div>
    </div>
  );
};
export default PlayPauseButton;
