import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Menu style={{ margin: "5px 0px 10px 0px" }}>
      <Menu.Item as={Link} to="/bookManage">
        Book Manage
      </Menu.Item>
      <Menu.Item as={Link} to="/userManage">
        User Manage
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
