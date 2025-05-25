import React, { useState, useEffect } from "react";
import axios from "axios";
import { XCircleIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { jwtDecode } from "jwt-decode";

const AddressModal = ({ isOpen, closeModal }) => {
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    streetAddress: "",
    houseNumber: "",
    roomNumber: "",
    floor: "",
    city: "",
    state: "",
    zipcode: "",
    landmark: "",
    category: "Home",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser?.token) {
      const decoded = jwtDecode(storedUser.token);
      setUserEmail(decoded.email || "");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = async () => {
    if (!userEmail) {
      alert("User not found. Please log in.");
      return;
    }

    if (!formData.name || !formData.mobileNumber || !formData.streetAddress || !formData.city || !formData.state || !formData.zipcode) {
      alert("Please fill all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await axios.put("/api/users/addAddress", {
        email: userEmail,
        address: formData,
      });

      if (response.status === 200) {
        alert("Address added successfully!");
        closeModal();
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-pink-600">ADD DELIVERY ADDRESS</h2>
          <XCircleIcon className="h-7 w-7 text-gray-500 cursor-pointer hover:text-gray-700" onClick={closeModal} />
        </div>

        {/* Use Current Location */}
        <button className="w-full flex items-center justify-center gap-2 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-700 transition">
          <MapPinIcon className="h-6 w-6" />
          Use My Location
        </button>

        {/* Address Form */}
        <div className="space-y-4 mt-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="input-style" required />
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" className="input-style" required />
          <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="Street Address" className="input-style" required />
          <input type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange} placeholder="House Number" className="input-style" required />
          <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} placeholder="Room/Flat Number" className="input-style" />
          <input type="text" name="floor" value={formData.floor} onChange={handleChange} placeholder="Floor (Optional)" className="input-style" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input-style" required />
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="input-style" required />
          </div>
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder="Pincode" className="input-style" required />
          <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Nearby Landmark (Optional)" className="input-style" />

          {/* Category Selection */}
          <select name="category" value={formData.category} onChange={handleChange} className="input-style">
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>

          {/* Save Address Button */}
          <button onClick={handleSaveAddress} className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition mt-4">
            Save Address and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
