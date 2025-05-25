"use client"; // Mark as client component

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Icons
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


const navItems = [
  { href: "/admin/manageorder", icon: <ListAltIcon />, label: "Manage Orders" },
  { href: "/admin/additems", icon: <AddCircleOutlineIcon />, label: "Add Items" },
  { href: "/admin/payments", icon: <PaymentIcon />, label: "Payments" },
  { href: "/admin/gallery", icon: <PhotoLibraryIcon />, label: "Gallery" },
];

const LeftLaptoSideNav = () => {
  const router = useRouter();

  // Logout function
  const adminLogout = () => {
    localStorage.removeItem("adminDetails"); // Clear admin details
    router.push("/"); // Redirect to home page
  };

  return (
    <div className="lg:block hidden w-64 h-screen bg-gray-900 text-white p-4 fixed left-0 top-0 z-50">
      <h2 className="text-xl font-semibold mb-6 text-center">Admin Panel</h2>

      <nav>
        <ul className="space-y-4">
          {navItems.map(({ href, icon, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                {icon} {label}
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={adminLogout}
              className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <ExitToAppIcon />
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftLaptoSideNav;
