import React from "react";
import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

function Header() {
  const [user, setUser] = React.useState(null);
  const auth = getAuth();
  React.useEffect(() => {
    auth.onAuthStateChanged((curUser) => {
      setUser(curUser);
    });
  }, []);

  return (
    <Menu secondary>
      <Menu.Item as={Link} to="/">
        BookSystem
      </Menu.Item>
      <Menu.Menu>
        <div className="ui right aligned category search item">
          <div className="ui transparent icon input">
            <input
              className="prompt"
              type="text"
              placeholder="Search animals..."
              size="30"
              maxLength="30"
            />
            <i className="search link icon" />
          </div>
          <div className="results" />
        </div>
      </Menu.Menu>
      <Menu.Menu position="right">
        {user ? (
          <>
            <Menu.Item as={Link} to="/user">
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
