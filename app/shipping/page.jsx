"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const page = () => {
  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-4">Shipment Policy</h1>
      <p className="mb-4">
        No Shipment 
      </p>

     
    </div>
  );
};

export default page;
