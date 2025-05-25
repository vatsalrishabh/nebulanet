"use client";
import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import React, { useState, useEffect } from 'react';
import AddItems from './AddItems';
import DeleteItem from './DeleteItem';
import UpdateItem from './UpdateItem';
import { Button } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import Image from 'next/image';
import axios from 'axios';

const RightAddItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
  const [isModalThreeOpen, setIsModalThreeOpen] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="lg:w-[84%] z-50 w-full absolute right-0 min-h-screen bg-gray-100 p-6">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <AdminBreadCrumbs links={[{ label: "Admin", href: "/admin" }]} name="Manage Products" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          className="w-60 h-16 text-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Item
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          className="w-60 h-16 text-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={() => setIsModalTwoOpen(true)}
        >
          Delete Item
        </Button>

        <Button
          variant="contained"
          color="warning"
          startIcon={<Edit />}
          className="w-60 h-16 text-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={() => setIsModalThreeOpen(true)}
        >
          Update Item
        </Button>
      </div>

      {/* Product List */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.productId} className="bg-white shadow-lg rounded-lg p-4 transition-all hover:shadow-xl">
           <Image
  src={product.imageOne || "https://via.placeholder.com/150"}
  alt={product.name}
  width={300} // Set your desired width
  height={176} // Set your desired height (maintain aspect ratio)
  className="w-full h-44 object-cover rounded-md"
  loading="lazy"
/>

              <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.category}</p>

              {/* Pricing Section */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-900 font-bold">₹{product.price}</p>
                {product.discount > 0 && (
                  <p className="text-red-500 font-medium text-sm">
                    -{product.discount}% Off
                  </p>
                )}
              </div>

              {/* Action Buttons inside card */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => setIsModalThreeOpen(true)}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<Delete />}
                  onClick={() => setIsModalTwoOpen(true)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">No products found.</p>
        )}
      </div>

      {/* Modals */}
      {isModalOpen && <AddItems isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      {isModalTwoOpen && <DeleteItem products={products} isOpen={isModalTwoOpen} onClose={() => setIsModalTwoOpen(false)} />}
      {isModalThreeOpen && <UpdateItem products={products} isOpen={isModalThreeOpen} onClose={() => setIsModalThreeOpen(false)} />}
    </div>
  );
};

export default RightAddItem;
