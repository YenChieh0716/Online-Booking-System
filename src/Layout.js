import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
