"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import "animate.css";


const SnackBarr = ({ message, statusCode, showSnackBar }) => { 
  const [open, setOpen] = useState(showSnackBar || false); // initially bhi false hai
  const [isClient, setIsClient] = useState(false);


   // Function to get user details from localStorage
    const getUserDetails = () => {
      let storedUser = localStorage.getItem("userDetails");
  
      if (storedUser) {
        try {
          storedUser = JSON.parse(storedUser);
          const decodedToken = jwtDecode(storedUser.token);
  
          // Check if token is expired
          if (decodedToken.exp * 1000 < Date.now()) {
            console.log("Session expired. Logging out...");
            logoutUser();
          } else {
            setLoggedInUser({
              isLoggedIn: true,
              token: storedUser.token,
              userName: decodedToken.name,
              userEmail: decodedToken.email,
              userNumber: decodedToken.mobile, // Changed to userNumber
            });
          }
        } catch (error) {
          console.error("Invalid token:", error);
          logoutUser();
        }
      }
    };

  useEffect(() => {
    if (showSnackBar) {
      setIsClient(true);
      setOpen(true);
      const timer = setTimeout(() => setOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackBar]);
  

  const handleClose = () => setOpen(false); // cross icon click krne pe bhi false krdo

  const getColor = () => {
    if (statusCode >= 200 && statusCode < 300) return "#4CAF50";  // Green - Success
    if (statusCode >= 300 && statusCode < 400) return "#2196F3";  // Blue - Redirect
    if (statusCode >= 400 && statusCode < 500) return "#FF9800";  // Orange - Client Error
    if (statusCode >= 500 && statusCode < 600) return "#F44336";  // Red - Server Error
    return "#E91E63";  // Pink - Default
  };

  if (!isClient || !open) return null;

  return (
    <div
      className="animate__animated animate__fadeInDown"
      style={{
        position: 'fixed',
        top: '40px',
        right: '10px',
        transform: 'translateX(-50%)',
        backgroundColor: getColor(),
        color: 'white',
        padding: '8px 15px',
        borderRadius: '6px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minWidth: '250px',
        maxWidth: '400px',
        zIndex: 1000,
      }}
    >
      {message}
      <IoClose 
        size={18} 
        style={{ cursor: 'pointer', marginLeft: 'auto' }} 
        onClick={handleClose} 
      />
    </div>
  );
};

export default SnackBarr;
