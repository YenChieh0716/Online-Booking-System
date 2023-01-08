import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import BookDetail from "./pages/BookDetail";
import BookManage from "./pages/BookManage";
import BookLaunch from "./pages/BookLaunch";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="bookDetail" element={<BookDetail />} />
          <Route path="bookManage" element={<BookManage />} />
          <Route path="bookLaunch" element={<BookLaunch />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
