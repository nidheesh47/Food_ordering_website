import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "../components/user/UserHeader";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import { AuthContext } from "../context/AuthContext";

function UserLayout() {
  const { isUserAuth } = useContext(AuthContext);

  return (
    <div>
      {isUserAuth ? <UserHeader /> : <Header />}
      <div className="min-h-96">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
