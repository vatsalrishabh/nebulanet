"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu as MenuIcon, Close as CloseIcon, ExpandMore, ExpandLess,   ArrowDropDown,
  ArrowDropUp } from "@mui/icons-material";
import LogInUserDetail from "./LogInUserDetail";
import logo from "../../public/assets/styledivaalogo.png";
import logowbg from "../../public/assets/styledivaawbg.png";

const AnNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const navLinks = [
    {
      title: "Shop Here",
      href: "#",

      subLinks: [
        { title: "Dress Materials", href: "/dressmaterial" },
        { title: "Readymade Kurtas", href: "/kurtas" },
        { title: "Readymade Suits", href: "/readymadedress" },
        { title: "Western Dress", href: "/westerndress" },
        { title: "Kids Wear", href: "/kidswear" }, // New item
        { title: "Gowns", href: "/gowns" }, // New item
        { title: "Readymade Blouses", href: "/readymadeblouses" }, // New item
        { title: "Sarees", href: "/sarees" }, // New item
      ],
    },
    { title: "About Us", href: "/aboutus" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact Us", href: "/contactus" },
  ];

  return (
    <div className="w-full bg-custombg shadow-md">
      {/* Top Navigation */}
      <div className="w-full flex justify-between items-center p-4">
        {/* Logo */}
        <div className="w-3/5 flex">
          <Image src={logowbg} alt="Logo" width={150} height={150} className="rounded-full" />
        </div>

        {/* Menu Icon */}
        <div className="w-1/5 flex justify-end">
          <div onClick={toggleMenu} className="cursor-pointer">
            {isOpen ? (
              <CloseIcon className="text-white text-3xl hover:text-brightPink transition-colors" />
            ) : (
              <MenuIcon className="text-white text-3xl hover:text-brightPink transition-colors" />
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="w-full bg-white p-4 flex flex-col items-center space-y-4 shadow-lg">
          {navLinks.map((link, index) => (
            <div key={index} className="w-full text-center">
              <div
                onClick={() => link.subLinks && toggleDropdown(index)}
                className="flex justify-center items-center text-lg text-customText hover:text-brightPink cursor-pointer transition-colors"
              >
                <Link href={link.href}>{link.title} </Link>
                {link.subLinks && (
                  openDropdown === index ? (
                    <ExpandLess className="ml-2 text-brightPink" />
                  ) : (
                    <ExpandMore className="ml-2 text-customText" />
                  )
                )}
              </div>
              {/* Submenu */}
              {link.subLinks && openDropdown === index && (
                <div className="mt-2 bg-white shadow-md rounded-lg p-2 w-48 mx-auto">
                  {link.subLinks.map((subLink, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subLink.href}
                      className="block px-4 py-2 text-customText hover:bg-brightPink hover:text-white transition-colors rounded"
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Login Button */}
          <div className="w-full text-center">
            <LogInUserDetail />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnNavbar;
