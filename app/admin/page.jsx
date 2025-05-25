"use client";
import React, { useState, useEffect } from "react";
import LeftLaptoSideNav from "./LeftLaptoSideNav";
import MobileAdminNav from "./MobileAdminNav";
import RLaptopSideNav from "./RLaptopSideNav";
// import AdminLoginPage from "./additems/AdminLoginPage";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminDetails");
    setIsAuthenticated(!!adminToken);
  }, []);

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <MobileAdminNav />
          <div className="flex">
            <LeftLaptoSideNav />
            <RLaptopSideNav />
          </div>
        </>
      ) : (
       <div> </div>
      )}
    </div>
  );
};

export default Page;