"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import {
  Search,
  ShoppingCart,
  Close,
  ArrowDropDown,
  ArrowDropUp,
} from "@mui/icons-material";
import logo from "../../public/assets/styledivaalogo.png";
import AnNavbar from "./AnNavbar";
import Link from "next/link";
import "animate.css";
import LogInUserDetail from "./LogInUserDetail";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, updateNumOfItems } from "../../redux/cart/openCartSlice";
import RightSlideCart from "./RightSlideCart";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const dispatch = useDispatch();
  const { numOfItems } = useSelector((state) => state.openCart);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");
  const [scrollNum, setScroll] = useState(false);
  const [cartItems, setCartItems] = useState(4); // Example: Cart item count
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to toggle search bar
  const [searchQuery, setSearchQuery] = useState("");
  const [dropSubNav, setDropSub] = useState(false);
  const router = useRouter();


  // Function to handle the cart icon click
  const handleCartClick = () => {
    dispatch(toggleCart()); // Toggle the cart open/close
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 55);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user details
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        setIsLoading(false);
        if (token) {
          const res = await fetch("/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) setLoggedInUser(await res.json());
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const tabs = [
    {
      name: "Shop Here",
      href: "/forher",
      dropdown: true,
      subNav: [
        { name: "Dress Materials", href: "/dressmaterial" },
        { name: "Readymade Kurtas", href: "/kurtas" },
        { name: "Readymade Suits", href: "/readymadedress" },
        { name: "Western Dress", href: "/westerndress" },
        { name: "Kids Wear", href: "/kidswear" }, // New item
        { name: "Gowns", href: "/gowns" }, // New item
        { name: "Readymade Blouses", href: "/readymadeblouses" }, // New item
        { name: "Sarees", href: "/sarees" }, // New item
      ],
    },
    { name: "About Us", href: "/aboutus", dropdown: false },
    { name: "Gallery", href: "/gallery", dropdown: false },
    { name: "Contact Us", href: "/contactus", dropdown: false },
  ];

  // Extracted common styles
  const navbarStyles = scrollNum
    ? "hidden lg:flex w-full pt-0 justify-center fixed shadow-lg opacity-70 animate__animated animate__slideInDown z-10 "
    : "hidden lg:flex w-full pt-16 justify-center fixed z-10 ";

  const whiteBoxStyles = scrollNum
    ? "bg-white w-full h-[12vh] flex items-center shadow-lg"
    : "bg-white w-4/5 h-[12vh] flex items-center shadow-lg rounded-lg";

  const iconContainerStyles = scrollNum
    ? "bg-white h-full flex justify-end px-8 items-center"
    : "bg-[#F7F7F7] h-full w-[216px] flex justify-end px-8 items-center translate-y-2 ";

 

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

 const gotoHome =()=>{
    router.push("/"); //push to home when clicked on StyleDiva Icon
  }

  return (
    <div className="w-full lg:h-[25vh] bg-custombg text-white">
      {/* the right sidec slide cart starts */}
      {/* <RightSlideCart /> */}
      {/* the rigt side slide cart ends */}

      {/* Laptop/Desktop Navigation */}
      <div className={navbarStyles}>
        <div></div>
        <div className={whiteBoxStyles}>
          {/* Logo Section */}
          <div className="logo w-1/6 flex justify-center items-center" onClick={gotoHome} >
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>

          {/* Tabs Section */}
          <div className="w-4/6">
            <div className="tabs w-4/6 flex justify-between text-base">
              {tabs.map((tab) => (
                <div key={tab.name} className="relative">
                  <p
                    onClick={() => {
                      if (tab.dropdown) {
                        setDropSub((prev) => !prev);
                      } else {
                        setActiveTab(tab.name);
                        router.push(tab.href);
                      }
                    }}
                    className={`cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 ease-in-out ${
                      activeTab === tab.name
                        ? "bg-brightPink text-white shadow-lg scale-110"
                        : "hover:bg-lightPink hover:text-brightPink hover:scale-110 text-customText"
                    }`}
                  >
                    {tab.name}{" "}
                    {tab.dropdown &&
                      (!dropSubNav ? <ArrowDropDown /> : <ArrowDropUp />)}
                  </p>

                  {tab.dropdown && dropSubNav && (
                    <div
                      className="absolute bg-white shadow-lg p-3 rounded-lg w-48 border border-gray-200"
                      style={{ top: "100%", left: "23%", zIndex: 10 }}
                    >
                      {tab.subNav.map((single, index) => (
                        <Link key={index} href={single.href} className="block">
                          <div className="text-black px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
                            {single.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link href="/enroll">
                <p className="bg-pink-700 px-4 py-2 rounded-md text-center text-white text-lg font-bold cursor-pointer animate-flash hover:bg-pink-800 hover:scale-105 transition-all duration-300">
                  Enroll Now
                </p>
              </Link>
            </div>
          </div>

          {/* Icons Section */}
          <div
            className={
              scrollNum ? "w-1/6 h-full flex" : "w-1/6 h-full flex bg-custombg"
            }
          >
            <div className="breakerHol w-[8px] h-[108%]">
              <div
                className="w-[8px] bg-gray-200 h-[4%]"
                style={{ clipPath: "polygon(0 1%, 0% 100%, 100% 100%)" }}
              ></div>
              <div
                className={
                  scrollNum ? "w-[8px] bg-white" : "w-[8px] bg-gray-200 h-[92%]"
                }
              ></div>
              <div
                className="w-[8px] bg-gray-200 h-[4%]"
                style={{ clipPath: "polygon(0 1%, 100% 0, 100% 100%)" }}
              ></div>
            </div>

            <div className={iconContainerStyles}>
              {/* This has Model login form */}
              <LogInUserDetail />
              {/* This has Model ends  */}
              <div className="icons flex space-x-4 items-center">
                <Search
                  className="cursor-pointer hover:scale-110 transition-all duration-300 text-customIcon hover:text-brightPink"
                  onClick={toggleSearch}
                />

                <div className="OpneCart" onClick={handleCartClick}>
                  <Badge
                    badgeContent={numOfItems}
                    color="secondary"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "rgb(239, 83, 80)", // Bright pink for emphasis
                        color: "white", // Text color inside the badge
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        minWidth: "20px",
                        height: "20px",
                      },
                    }}
                  >
                    <ShoppingCart className="cursor-pointer hover:scale-110 transition-all duration-300 text-customIcon hover:text-brightPink" />
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className=" absolute top-[165px] searchbar h-[6vh] w-3/6 bg-slate-50 flex items-center px-4 animate__animated animate__fadeIn">
            <Search className="text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-grow px-2 py-1 border-none outline-none text-gray-700"
            />
            <Close
              className="cursor-pointer text-gray-500"
              onClick={toggleSearch}
            />
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex">
        <AnNavbar />
      </div>

      {/* The left slideIn Images and text start */}
    </div>
  );
};

export default Navbar;
