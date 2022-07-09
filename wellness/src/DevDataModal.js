import React from "react";
import { useWakeLock } from "react-screen-wake-lock";
import { Divider, Icon, Modal } from "semantic-ui-react";
import Config from "./Config";
import lotus from "./images/lotus.png";

const DevDataModal = ({ children, isOpen, onClose }) => {
  const { isSupported: wakeLockIsSupported } = useWakeLock();
  return (
    <Modal
      basic
      trigger={children}
      open={isOpen}
      onClose={onClose}
      closeOnDocumentClick={true}
    >
      <Modal.Content className="info">
        <h1>Wellness Timer</h1>
        <img className="logo" src={lotus} alt="Logo" />
        <a
          href="https://github.com/andy-todd-dev/wellness_tracker"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="github" />
          https://github.com/andy-todd-dev/wellness_tracker
        </a>
        <p className="bmac">
          If you have found this app useful and want to support future work:{" "}
          <a
            href="https://www.buymeacoffee.com/andytodddev"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
            />
          </a>
        </p>
        <Divider />
        <div className="credits">
          <ul>
            <li>
              Lotus icons created by Freepik -{" "}
              <a
                href="https://www.flaticon.com/free-icons/lotus"
                title="lotus icons"
                target="_blank"
                rel="noreferrer"
              >
                Flaticon
              </a>
            </li>
            <li>
              Additional sounds: Joseph SARDIN -{" "}
              <a
                href="https://BigSoundBank.com"
                target="_blank"
                rel="noreferrer"
              >
                BigSoundBank.com
              </a>
            </li>
          </ul>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Divider />
        <span>
          <b>Build:</b> {Config.buildName}
        </span>
        <span>
          <b>Wake lock:</b>{" "}
          {wakeLockIsSupported ? "supported" : "not supported"}
        </span>
      </Modal.Actions>
    </Modal>
  );
};

export default DevDataModal;
