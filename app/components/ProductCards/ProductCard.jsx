"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductCard = ({ productId, img, discount, name, rate, description, price, mrp }) => {
  const router = useRouter();

  const handleSeeDetails = () => {
    router.push(`/product/${productId}`);
  };

  // Calculate discount percentage
  const discountPercentage = mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200">
      {/* ✅ Safe Image Handling */}
      {img ? (
        <Image 
          src={img} 
          alt={name} 
          width={300} 
          height={200} 
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      <div className="p-4 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-900 truncate">{name}</h3>
        <p className="text-gray-600 text-sm truncate">{description}</p>

        {/* Pricing Section */}
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-gray-500 line-through text-sm">₹{mrp}</span>
          <span className="text-xl font-bold text-gray-900">₹{price}</span>
          {discountPercentage > 0 && (
            <span className="text-green-600 bg-green-100 px-2 py-1 text-xs font-semibold rounded-lg">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        <p className="text-gray-500 text-sm mt-1">Rating: {rate} ⭐</p>

        <button
          onClick={handleSeeDetails}
          className="mt-4 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
