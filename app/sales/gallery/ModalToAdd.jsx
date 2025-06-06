import React, { useEffect, useState } from "react";
import { FaInstagram, FaBarcode, FaTimes } from "react-icons/fa";
import { Button, Select, MenuItem, TextField, CircularProgress } from "@mui/material";
import axios from "axios";

const ModalToAdd = ({ isOpen, onClose, productId, instagramLink }) => {
  const [isNewProduct, setIsNewProduct] = useState("no");
  const [productIdState, setProductIdState] = useState(productId || "");
  const [instagramLinkState, setInstagramLinkState] = useState(instagramLink || "");
  const [error, setError] = useState({ productId: "", instagramLink: "" });
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const getAdminDetails = localStorage.getItem("adminDetails");
    if (getAdminDetails) {
      setLoggedInUser(JSON.parse(getAdminDetails));
    }
  }, []);

  const handleSubmit = async () => {
    let errors = {};

    if (!productIdState.trim()) {
      errors.productId = "Product ID is required.";
    }
    if (!instagramLinkState.trim()) {
      errors.instagramLink = "Instagram link is required.";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setError({});
    setLoading(true);

    try {
      const response = await axios.post(
        "/admin/gallery/postNew",
        { isNewProduct, productId: productIdState, instagramLink: instagramLinkState },
        {
          headers: {
            Authorization: `Bearer ${loggedInUser.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError({ api: "Failed to submit. Try again." });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Add Product</h2>

        <Select
          fullWidth
          value={isNewProduct}
          onChange={(e) => setIsNewProduct(e.target.value)}
          className="mb-4"
        >
          <MenuItem value="yes">New Product</MenuItem>
          <MenuItem value="no">Existing Product</MenuItem>
        </Select>

        <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
          <FaBarcode className="text-gray-500 mr-2" />
          <TextField
            fullWidth
            label="Product ID"
            value={productIdState}
            onChange={(e) => setProductIdState(e.target.value)}
            error={!!error.productId}
            helperText={error.productId}
          />
        </div>

        <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
          <FaInstagram className="text-pink-500 mr-2" />
          <TextField
            fullWidth
            label="Instagram Link"
            value={instagramLinkState}
            onChange={(e) => setInstagramLinkState(e.target.value)}
            error={!!error.instagramLink}
            helperText={error.instagramLink}
          />
        </div>

        {error.api && <p className="text-red-500 text-center mb-2">{error.api}</p>}

        <Button
          variant="contained"
          color={isNewProduct === "no" ? "success" : "error"}
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : isNewProduct === "no" ? "Update" : "Add New"}
        </Button>
      </div>
    </div>
  );
};

export default ModalToAdd;
