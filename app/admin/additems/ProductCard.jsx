"use client";
import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import axios from "axios";

const ProductCard = ({ productId, productImg, productName }) => {
  // Function to delete product when button is clicked
  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`/api/products/deleteProduct?productId=${productId}`);
      console.log(response.data);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product!");
    }
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Product Image */}
 <Image
    src={productImg}
    alt="Product"
    fill
    className="object-cover rounded"
  />

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{productName}</h2>
        <p className="text-gray-500 text-sm mt-1">Product ID: {productId}</p>
      </div>

      {/* Card Footer (Delete Button) */}
      <div className="p-4 border-t flex justify-end">
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={deleteProduct}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
