import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Searchbar from "./Searchbar";

function Header() {
  const [user, setUser] = React.useState(null);
  const auth = getAuth();
  React.useEffect(() => {
    auth.onAuthStateChanged((curUser) => {
      setUser(curUser);
    });
  }, []);

  return (
    <Menu secondary style={{ margin: "5px 0px 0px 0px" }}>
      <Menu.Item as={Link} to="/">
        Online Book System
      </Menu.Item>
      <Menu.Menu>
        <Searchbar />
      </Menu.Menu>
      <Menu.Menu position="right">
        {user ? (
          <>
            <Menu.Item as={Link} to="/userSet">
              用戶
            </Menu.Item>
            <Menu.Item onClick={() => auth.signOut()}>登出</Menu.Item>
          </>
        ) : (
          <Menu.Item as={Link} to="/signin">
            註冊/登入
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
