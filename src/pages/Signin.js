import React from "react";
import { Menu, Form, Container, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Signin() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState("register");
  const [email, setEmail] = React.useState("");
  const [identity, setIdentity] = React.useState("user");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * 點選註冊/登入按鈕
   */
  function onSubmit() {
    setIsLoading(true);
    const auth = getAuth();

    if (activeItem === "register") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/"); // 將使用者導至首頁
          setIsLoading(false);
        })
        .catch((error) => {
          switch (error.code) {
            // 註冊錯誤處理
            case "auth/email-already-in-use":
              setErrorMessage("信箱已存在");
              break;
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/weak-password":
              setErrorMessage("密碼強度不足");
              break;
            default:
          }
          setIsLoading(false);
        });
    } else if (activeItem === "signin") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/"); // 將使用者導至首頁
          setIsLoading(false);
        })
        .catch((error) => {
          // 登入錯誤處理
          switch (error.code) {
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/user-not-found":
              setErrorMessage("用戶不存在");
              break;
            case "auth/wrong-password":
              setErrorMessage("密碼錯誤");
              break;
            default:
          }
          setIsLoading(false);
        });
    }
  }

  return (
    <Container>
      <Menu widths="2">
        <Menu.Item
          active={activeItem === "register"}
          onClick={() => {
            setErrorMessage("");
            setActiveItem("register");
          }}
        >
          註冊
        </Menu.Item>
        <Menu.Item
          active={activeItem === "signin"}
          onClick={() => {
            setErrorMessage("");
            setActiveItem("signin");
          }}
        >
          登入
        </Menu.Item>
      </Menu>

      <Form onSubmit={onSubmit}>
        <Form.Input
          label="信箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="請輸入信箱"
          required
        />
        <Form.Input
          label="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="請輸入密碼"
          type="password"
          required
        />
        <Form.Input
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          style={{ display: "none" }}
        />
        {errorMessage && <Message negative>{errorMessage}</Message>}
        <Form.Button loading={isLoading}>
          {activeItem === "register" && "註冊"}
          {activeItem === "signin" && "登入"}
        </Form.Button>
      </Form>
    </Container>
  );
}

export default Signin;
