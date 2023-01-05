import { Menu, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
function Header() {
    return <Menu>
        <Menu.Item as={Link} to="/"> <h4>Borrow Books</h4></Menu.Item>{/*link去渲染*/}

        <Menu.Item>
            <Search ></Search>

        </Menu.Item>
        <Menu.Menu position='right'>

            <Menu.Item as={Link} to="/Signin"><h4>Register/Login</h4></Menu.Item>
        </Menu.Menu>
    </Menu>;
}
export default Header;