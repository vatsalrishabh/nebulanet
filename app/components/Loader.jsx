"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/assets/styledivaalogo.png";

const Loader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null; // Hide the modal when completed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-pink-300 bg-opacity-80 backdrop-blur-md z-50 transition-opacity duration-500">
      <div className="relative flex flex-col items-center p-6 bg-white rounded-2xl shadow-2xl animate-fadeIn">
        <Image 
          src={logo} 
          alt="Loading" 
          width={120} 
          height={120} 
          className="animate-spin-slow drop-shadow-lg"
        />
        <p className="text-pink-700 text-lg font-semibold mt-4 animate-fadeIn">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
