import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import UserSet from "./pages/UserSet";
import BookEdit from "./pages/BookEdit";
import BookManage from "./pages/BookManage";
import BookLaunch from "./pages/BookLaunch";
import NoMatch from "./pages/NoMatch";
import UserManage from "./pages/UserManage";
import UserEdit from "./pages/UserEdit";
import BookCart from "./pages/BookCart";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="userSet" element={<UserSet />} />
          <Route path="bookManage/bookEdit/:bookId" element={<BookEdit />} />
          <Route path="bookManage" element={<BookManage />} />
          <Route path="bookManage/bookLaunch" element={<BookLaunch />} />
          <Route path="userManage" element={<UserManage />} />
          <Route path="userManage/userEdit/:userId" element={<UserEdit />} />
          <Route path="bookCart" element={<BookCart/>} />
          <Route path="searchPage" element={<SearchPage/>}/>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
