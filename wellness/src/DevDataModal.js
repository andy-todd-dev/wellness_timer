import React from "react";
import { useWakeLock } from "react-screen-wake-lock";
import { Icon, Modal } from "semantic-ui-react";
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
        <h1>
          Wellness Timer <img className="logo" src={lotus} alt="Logo" />
        </h1>
        <a
          href="https://github.com/andy-todd-dev/wellness_tracker"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="github" />
          https://github.com/andy-todd-dev/wellness_tracker
        </a>
        <h2>Debug properties</h2>
        <table className="devData">
          <tbody>
            <tr>
              <th>Build</th>
              <td>{Config.buildName}</td>
            </tr>
            <tr>
              <th>Wake lock</th>
              <td>{wakeLockIsSupported ? "supported" : "not supported"}</td>
            </tr>
          </tbody>
        </table>
        <div className="credits">
          <h2>Credits</h2>
          <a
            href="https://www.flaticon.com/free-icons/lotus"
            title="lotus icons"
          >
            Lotus icons created by Freepik - Flaticon
          </a>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default DevDataModal;
