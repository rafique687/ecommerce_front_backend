import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Header from "../backend/Header";
import Footer from "./Footer";

function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, cktoken, ckadmin } = useContext(AuthContext);

  useEffect(() => {
    // Redirect to login if no token
    if (!cktoken) {
      navigate("/login");
    }
  }, [cktoken, navigate]);

  return (
    <>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Header ckadmin={ckadmin} />

        <div className="p-4 flex-grow-1 bg-light">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
