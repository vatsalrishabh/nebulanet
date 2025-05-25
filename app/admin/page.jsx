"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LeftLaptoSideNav from "./LeftLaptoSideNav";
import MobileAdminNav from "./MobileAdminNav";
import RLaptopSideNav from "./RLaptopSideNav";

const COOKIE_NAME = "adminSession";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if cookie exists and not expired
    const session = Cookies.get(COOKIE_NAME);
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const validateUserId = (id) => {
    return /^\d{10}$/.test(id);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!validateUserId(userId)) {
      setError("User ID must be exactly 10 digits numeric.");
      return;
    }

    if (password !== "9236524859") {
      setError("Invalid password.");
      return;
    }

    // Login success - create cookie for 1 hour
    Cookies.set(COOKIE_NAME, userId, { expires: 1 / 24 }); // 1 hour = 1/24 day

    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    Cookies.remove(COOKIE_NAME);
    setIsAuthenticated(false);
    setUserId("");
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 p-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Admin Login
          </h2>
          <label className="block mb-2 font-semibold text-gray-300">
            User ID (10 digits)
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            maxLength={10}
            className="w-full p-3 rounded mb-5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-maroon"
            placeholder="Enter User ID"
          />

          <label className="block mb-2 font-semibold text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded mb-5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-maroon"
            placeholder="Enter Password"
          />

          {error && (
            <p className="text-red-500 mb-5 text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-custom-maroon text-white py-3 rounded hover:bg-custom-maroon2 transition"
          >
            Log In
          </button>
        </form>
      </div>
    );
  }

  // Authenticated view
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition z-50"
      >
        Logout
      </button>
      <MobileAdminNav />
      <div className="flex">
        <LeftLaptoSideNav />
        <RLaptopSideNav />
      </div>
    </div>
  );
};

export default Page;
