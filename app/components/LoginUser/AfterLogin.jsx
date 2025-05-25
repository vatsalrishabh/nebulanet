"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js Router
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";

const AfterLogin = ({ userName, userEmail, userId, userMobile, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter(); // Next.js Router

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleClose(); // Close the menu first
    router.push(path); // Navigate to the selected page
  };

  // Function to get the first letter of the user's name or email
  const getInitial = (nameOrEmail) => {
    return nameOrEmail?.charAt(0).toUpperCase() || "U"; // Default to "U" if no name is provided
  };

  return (
    <div className="AfterLogin lg:pr-8">
      {/* Avatar with the first letter of the user's name */}
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <Avatar>
          {getInitial(userName || userEmail)} {/* Display first letter */}
        </Avatar>
      </div>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem onClick={() => handleNavigate("/profile")}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem onClick={() => handleNavigate("/orders")}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          Orders
        </MenuItem>

        {/* <MenuItem onClick={() => handleNavigate("/wishlist")}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" className="text-red-500" />
          </ListItemIcon>
          Wishlist
        </MenuItem> */}

        {/* <MenuItem onClick={() => handleNavigate("/wallet")}>
          <ListItemIcon>
            <AccountBalanceWalletIcon fontSize="small" className="text-green-500" />
          </ListItemIcon>
          Wallet
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            handleClose();
            onLogout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" className="text-gray-600" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AfterLogin;
