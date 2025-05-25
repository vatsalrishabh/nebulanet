"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Image from "next/image";

const UpdateItem = ({ isOpen, onClose, products }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [previewImages, setPreviewImages] = useState({});
  const [searchId, setSearchId] = useState(''); // renamed from productId
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discount, setDiscount] = useState(0);

  const price = watch("price", "0");
  const mrp = watch("mrp", "0");

  const calculateDiscount = (mrp, price) => {
    const parsedMRP = parseFloat(mrp) || 0;
    const parsedPrice = parseFloat(price) || 0;
    if (parsedMRP > 0 && parsedPrice > 0 && parsedPrice <= parsedMRP) {
      return parseFloat((((parsedMRP - parsedPrice) / parsedMRP) * 100).toFixed(2));
    }
    return 0;
  };

  useEffect(() => {
    const newDiscount = calculateDiscount(mrp, price);
    setDiscount(newDiscount);
    setValue("discount", newDiscount);
  }, [price, mrp, setValue]);

  const handleFileChange = (e, imageField) => {
    const file = e.target.files[0];
    if (file) {
      setValue(imageField, file);
      setPreviewImages((prev) => ({
        ...prev,
        [imageField]: URL.createObjectURL(file),
      }));
    }
  };

  useEffect(() => {
    const trimmedId = searchId.trim();
    if (trimmedId) {
      const foundProduct = products.find((p) => p.productId === trimmedId);
      if (foundProduct) {
        setSelectedProduct(foundProduct);
        Object.entries(foundProduct).forEach(([key, value]) => {
          if (key === "stock") {
            Object.entries(value).forEach(([size, stockVal]) => {
              setValue(`stock[${size}]`, stockVal);
            });
          } else {
            setValue(key, value);
          }
        });
      } else {
        setSelectedProduct(null);
        reset();
      }
    } else {
      setSelectedProduct(null);
      reset();
    }
  }, [searchId, products, reset, setValue]);

  const onSubmit = async (data) => {
    if (!selectedProduct) {
      alert("Please enter a valid Product ID.");
      return;
    }

    const formData = new FormData();
    formData.append("productId", searchId.trim());

    for (const key in data) {
      if (data[key] instanceof File) {
        formData.append(key, data[key], `${Date.now()}-${data[key].name}`);
      } else if (typeof data[key] === "object") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      await axios.patch("/api/admin/updateProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      reset();
      setPreviewImages({});
      setSearchId("");
      setSelectedProduct(null);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg overflow-y-auto h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Update Product</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <CloseIcon />
          </button>
        </div>

        {/* Product ID Search */}
        <input
          type="text"
          placeholder="Enter Product ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Product Preview */}
        {selectedProduct && (
          <div className="bg-gray-100 p-4 rounded mb-6">
            <p>
              Name:
              <input
                className="ml-2 px-2 py-1 border rounded"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
              />
            </p>
            <p>
              Price:
              <input
                className="ml-2 px-2 py-1 border rounded"
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, price: e.target.value })
                }
              />
            </p>
            <p>
              MRP:
              <input
                className="ml-2 px-2 py-1 border rounded"
                type="number"
                value={selectedProduct.mrp}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, mrp: e.target.value })
                }
              />
            </p>
            <p>
              Category:
              <input
                className="ml-2 px-2 py-1 border rounded"
                value={selectedProduct.category}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, category: e.target.value })
                }
              />
            </p>
            {/* Image Previews */}
            {["imageOne", "imageTwo", "imageThree", "imageFour", "imageFive", "imageSix"].map((imageField, index) => (
              <div key={imageField} className="flex flex-col items-center">
                <label className="text-sm font-semibold">Image {index + 1}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, imageField)}
                  className="border p-2 rounded"
                />
              {selectedProduct[imageField] && (
  <Image
    src={selectedProduct[imageField]}
    alt={`Image ${index + 1}`}
    width={80}
    height={80}
    className="object-cover mt-2 rounded"
  />
)}

{previewImages[imageField] && (
  <Image
    src={previewImages[imageField]}
    alt={`Preview ${index + 1}`}
    width={80}
    height={80}
    className="object-cover mt-2 rounded"
  />
)}
              </div>
            ))}
          </div>
        )}

        {/* Show form only if product is selected */}
        {selectedProduct ? (
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <input {...register("name")} placeholder="Product Name" className="border p-2 rounded" required />
            <input {...register("rating")} type="number" step="0.1" min="0" max="5" placeholder="Rating" className="border p-2 rounded" />
            <input {...register("reviews")} placeholder="Reviews (e.g., 2.3K)" className="border p-2 rounded" />
            <input {...register("price")} type="number" placeholder="Price" className="border p-2 rounded" />
            <input {...register("mrp")} type="number" placeholder="MRP" className="border p-2 rounded" />
            <input {...register("discount")} value={discount} readOnly className="border p-2 rounded bg-gray-200" />

            <select {...register("category")} className="border p-2 rounded">
              <option value="dressmaterial">Dress Material</option>
              <option value="readymadekurtas">Readymade Kurtas</option>
              <option value="readymadedress">Readymade Dress</option>
              <option value="westerndress">Western Dress</option>
              <option value="kidswear">Kids Wear</option>
              <option value="gowns">Gowns</option>
              <option value="readymadeblouses">Readymade Blouses</option>
              <option value="sarees">Sarees</option>
            </select>

            <input {...register("color")} placeholder="Color" className="border p-2 rounded" />
            <input {...register("print")} placeholder="Print Type" className="border p-2 rounded" />
            <input {...register("neck")} placeholder="Neck Style" className="border p-2 rounded" />
            <input {...register("sleeves")} placeholder="Sleeve Type" className="border p-2 rounded" />
            <input {...register("shape")} placeholder="Shape & Fit" className="border p-2 rounded" />
            <input {...register("length")} placeholder="Length & Hem" className="border p-2 rounded" />
            <input {...register("material")} placeholder="Material Type" className="border p-2 rounded" />
            <input {...register("fit")} placeholder="Model Fit" className="border p-2 rounded" />

            {/* Stock Inputs */}
            <div className="col-span-2 grid grid-cols-3 gap-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <input
                  key={size}
                  {...register(`stock[${size}]`)}
                  type="number"
                  placeholder={`Stock (${size})`}
                  className="border p-2 rounded"
                />
              ))}
            </div>

            <button type="submit" className="col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Update Product
            </button>
          </form>
        ) : (
          <div>Please enter Product ID</div>
        )}
      </div>
    </div>
  );
};

export default UpdateItem;
