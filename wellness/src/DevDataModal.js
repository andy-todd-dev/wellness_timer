import React from "react";
import { useWakeLock } from "react-screen-wake-lock";
import { Modal } from "semantic-ui-react";
import Config from "./Config";

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
      <Modal.Content>
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
      </Modal.Content>
    </Modal>
  );
};

export default DevDataModal;
