import { Menu, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';
function Navbar() {
    return <Menu className='bg-dark navbar-dark navbar' style={{ margin: '0 0 20px 0' }}>
        <Menu.Item style={{ color: 'white' }} as={Link} to="/"> <h4>借閱紀錄</h4></Menu.Item>{/*link去渲染*/}
        <Menu.Item style={{ color: 'white' }} as={Link} to="/" position='left'><h4>會員管理</h4></Menu.Item>{/*link去渲染*/}
    </Menu>;

}
export default Navbar;
