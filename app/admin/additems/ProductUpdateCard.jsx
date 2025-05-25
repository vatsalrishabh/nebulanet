"use client";
import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductUpdateCard = ({ productId, productImg, productName, setProductId }) => {
  // Function to set product ID in the parent component
  const setProductIdInParent = () => {
    setProductId?.(productId); // Optional chaining used here
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Product Image */}
      {productImg ? (
       <Image
    src={productImg}
    alt="Product"
    width={400} // adjust based on your design
    height={224} // e.g., 16:9 ratio (400x224)
    className="w-full h-56 object-cover rounded-md"
  />
      ) : (
        <div className="w-full h-56 flex items-center justify-center bg-gray-200">
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{productName || "Unnamed Product"}</h2>
        <p className="text-gray-500 text-sm mt-1">Product ID: {productId || "N/A"}</p>
      </div>

      {/* Card Footer */}
      <div className="p-4 border-t flex justify-end">
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={setProductIdInParent}
          disabled={!productId} // Disable button if productId is missing
        >
          Update Details
        </Button>
      </div>
    </div>
  );
};

export default ProductUpdateCard;
