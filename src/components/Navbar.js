import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Menu>
      <Menu.Item as={Link} to="/bookManage">
        Book Manage
      </Menu.Item>
      <Menu.Item as={Link} to="/userManage">
        User Manage
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
