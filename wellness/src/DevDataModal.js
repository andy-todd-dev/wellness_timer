import React from "react";
import { Modal } from "semantic-ui-react";

const DevDataModal = ({
  children,
  isOpen,
  onClose,
  wakeLockIsSupported,
  buildName,
}) => {
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
              <td>{buildName}</td>
              {/* {(process.env.REACT_APP_BUILD &&
                  process.env.REACT_APP_BUILD.substring(0, 7)) ||
                  "dev"} */}
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
