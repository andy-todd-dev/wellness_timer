import React, { useState } from "react";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import DevDataModal from "../DevDataModal";

const UserMenu = ({ visible, direction, animation, closeOnClick, onHide }) => {
  const [devDataIsOpen, setDevDataIsOpen] = useState(false);
  return (
    <Sidebar
      as={Menu}
      animation={animation}
      direction={direction}
      icon="labeled"
      inverted
      vertical
      visible={visible}
      width="thin"
      target={closeOnClick}
      onHide={onHide}
    >
      <Menu.Item as={"a"}>
        <Icon name="hourglass two" />
      </Menu.Item>
      <DevDataModal
        onClose={() => {
          setDevDataIsOpen(false);
        }}
        isOpen={devDataIsOpen}
      >
        <Menu.Item as={"a"}>
          <Icon
            name="info circle"
            onClick={() => {
              setDevDataIsOpen(true);
            }}
          />
        </Menu.Item>
      </DevDataModal>
    </Sidebar>
  );
};

export default UserMenu;
