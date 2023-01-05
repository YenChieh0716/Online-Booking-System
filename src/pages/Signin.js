import React from 'react';
import { Menu, Form, Container } from 'semantic-ui-react';
// import firebase from 'firebase';
// require('firebase/auth');
import 'firebase/compat/auth';
import firebase from '../database/firebase';
import { useNavigate } from 'react-router-dom';
function Signin() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = React.useState("register");
    const [account, setAccount] = React.useState("");
    const [password, setPassword] = React.useState("");
    function Submit() {
        if (activeItem === 'register') {
            firebase.auth().createUserWithEmailAndPassword(account, password).then(() => {
                alert('註冊成功');
                navigate('/');
            });
        }
        else if (activeItem === 'signin') {
            firebase.auth().signInWithEmailAndPassword(account, password).then(() => {
                alert('登入成功');
                navigate('/');
            });
        }
    }
    return <>
        <Container>
            <Menu widths={2}>
                <Menu.Item active={activeItem === 'register'}
                    onClick={() => setActiveItem("register")}>註冊</Menu.Item>
                <Menu.Item active={activeItem === 'signin'}
                    onClick={() => setActiveItem("signin")}>登入</Menu.Item>
            </Menu>
            <Form onSubmit={Submit}>
                <Form.Input label="信箱/帳號" value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="請輸入帳號">
                </Form.Input>
                <Form.Input label="密碼" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="請輸入密碼" type='password'>
                </Form.Input>
                <Form.Button>
                    {activeItem === 'register' && '註冊'}
                    {activeItem === 'signin' && '登入'}
                </Form.Button>
            </Form>
        </Container>
    </>;
}
export default Signin;