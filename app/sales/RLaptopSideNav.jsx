"use client";
import React from "react";
import DashboardCard from "./DashboardCard";

// Import Icons
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AdminBreadCrumbs from "../../components/Admin/AdminBreadCrumbs";

// Data Array for Cards
const cardData = [
  { heading: "Manage Orders", number: 1250, Icon: ListAltIcon, bgColor: "#4A90E2", link:"admin/manageorder" },
  { heading: "Add Items", number: 320, Icon: AddCircleOutlineIcon, bgColor: "#16a34a", link:"admin/additems" },
  { heading: "Payments", number: "₹35,420", Icon: PaymentIcon, bgColor: "#d97706", link:"admin/payments" },
  { heading: "Gallery", number: 75, Icon: PhotoLibraryIcon, bgColor: "#9333ea", link:"admin/gallery" },
];

const breadcrumbLinks = [
    { label: "Admin", href: "/admin" },
    // { label: "Manage Orders", href: "/admin/manageorder" },
  ];
const RLaptopSideNav = () => {
  return (
    <div className="lg:w-[84%] z-50 w-full absolute right-0 h-[100vh] bg-slate-200 p-6">
      {/* Grid Layout: 3 Columns on Large Screens, 1 Column on Small Screens */}
      <div className="p-4">
      <AdminBreadCrumbs links={breadcrumbLinks} name="Admin Dashboard" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default RLaptopSideNav;