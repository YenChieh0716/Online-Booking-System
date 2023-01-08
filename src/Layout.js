import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import NavBar from "./components/Navbar";

function Layout() {
  return (
    <div>
      <Header />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Layout;
