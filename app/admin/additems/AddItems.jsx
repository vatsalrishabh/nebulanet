import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import axios from "axios";

const AddItems = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [previewImages, setPreviewImages] = useState({});
  const [discount, setDiscount] = useState(0);

  // Watch for real-time changes in price & MRP
  const price = watch("price", "0");
  const mrp = watch("mrp", "0");

  // Function to calculate discount with float support
  const calculateDiscount = (mrp, price) => {
    const parsedMRP = parseFloat(mrp) || 0;
    const parsedPrice = parseFloat(price) || 0;
    if (parsedMRP > 0 && parsedPrice > 0 && parsedPrice <= parsedMRP) {
      return parseFloat((((parsedMRP - parsedPrice) / parsedMRP) * 100).toFixed(2));
    }
    return 0;
  };

  // Effect to update discount when price or MRP changes
  useEffect(() => {
    const newDiscount = calculateDiscount(mrp, price);
    setDiscount(newDiscount);
    setValue("discount", newDiscount); // Update discount in the form
  }, [price, mrp, setValue]);

  // Handles file selection & preview
  const handleFileChange = (e, imageField) => {
    const file = e.target.files[0];
    if (file) {
      setValue(imageField, file);
      setPreviewImages((prev) => ({ ...prev, [imageField]: URL.createObjectURL(file) }));
    }
  };

  // Form Submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "stock") {
        const stockObj = data[key];
        Object.keys(stockObj).forEach((size) => {
          formData.append(`stock[${size}]`, stockObj[size]);
        });
      } else if (data[key] instanceof File) {
        formData.append(key, data[key], `${Date.now()}-${data[key].name}`);
      } else {
        formData.append(key, data[key]);
      }
    });
    

    try {
      console.log(formData.stock);
      await axios.post("/api/admin/addProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(formData.stock+"THE STOCK");
      alert("Product added successfully!");
      reset();
      setPreviewImages({});
      setDiscount(0);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-md overflow-auto h-[90vh]">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Add Product</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black"><CloseIcon /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <input {...register("name")} placeholder="Product Name" className="border p-2 rounded" required />
          <input {...register("rating")} type="number" step="0.1" min="0" max="5" placeholder="Rating (0-5)" className="border p-2 rounded" />
          <input {...register("reviews")} placeholder="Reviews Count (e.g., 2.3K)" className="border p-2 rounded" />

          {/* MRP, Price, and Discount Fields */}
          <input {...register("price")} type="number" step="0.01" placeholder="Price (₹)" className="border p-2 rounded" required />
          <input {...register("mrp")} type="number" step="0.01" placeholder="MRP (₹)" className="border p-2 rounded" required />
          <input {...register("discount")} type="number" value={discount} placeholder="Discount (%)" className="border p-2 rounded bg-gray-200" readOnly />

          {/* Category Dropdown */}
          <select {...register("category")} className="border p-2 rounded" required defaultValue="dressmaterial">
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

          <div className="col-span-2 grid grid-cols-3 gap-2">
  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
    <input 
      key={size} 
      {...register(`stock[${size}]`)} 
      type="number" 
      min="0" 
      placeholder={`Stock (${size})`} 
      className="border p-2 rounded" 
      onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} 
    />
  ))}
</div>


          {/* Image Uploads */}
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <label className="text-sm font-semibold">Image {num}</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, `image${num}`)} className="border p-2 rounded" />
              {previewImages[`image${num}`] && <Image
  src={previewImages[`image${num}`]}
  alt={`Preview ${num}`}
  width={100}
  height={100}
  className="object-cover rounded"
/>}
            </div>
          ))}

          <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
