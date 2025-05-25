"use client";
import React from 'react';
import Image from 'next/image';
import logo from "../../public/assets/styledivaalogo.png";

const HomeLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="flex flex-col items-center">
        {/* Logo with bounce-in and breathing animation */}
        <div className="animate__animated animate__bounceIn">
          <Image
            src={logo}
            alt="StyleDivaa Logo"
            width={420}
            height={420}
            priority
            className="animate-breathe mt-4 drop-shadow-2xl"
          />
        </div>

        {/* Tagline with fade-in-up animation */}
        <p className="text-xl sm:text-2xl font-medium text-pink-800 italic tracking-wide mt-6 animate-fadeInUp">
          By — Ratna Satish
        </p>

        {/* "Since 1986" with smooth fade-in from bottom */}
        <p className="text-lg sm:text-xl font-light text-gray-600 mt-4 opacity-0 animate__animated animate__fadeInUp animate__delay-1s">
          Since 2008
        </p>
      </div>
    </div>
  );
};

export default HomeLoader;
