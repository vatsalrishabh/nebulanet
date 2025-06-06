"use client";
import Link from "next/link";
import React from "react";

const DashboardCard = ({ heading, number, Icon, bgColor, link }) => {
  return (
    <Link href={link}>
    <div
      className="p-6 rounded-xl shadow-lg text-white flex flex-col justify-between items-center transform transition hover:scale-105 w-full"
      style={{ backgroundColor: bgColor ?? "#1f2937" }} // Default Dark Gray
    >
      {/* Icon */}
      {Icon && <Icon className="text-5xl mb-3" />}

      {/* Card Content */}
      <h2 className="text-lg font-semibold">{heading ?? "N/A"}</h2>
      <p className="text-3xl font-bold mt-2">{number ?? "0"}</p>
    </div>
    </Link>
  );
};

export default DashboardCard;