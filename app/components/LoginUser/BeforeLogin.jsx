"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  AlternateEmail as AlternateEmailIcon,
  Cancel as CancelIcon,
  Password as PasswordIcon,
} from "@mui/icons-material";
import axios from "axios";
import SnackBarr from "../SnackBarr";

const BeforeLogin = ({ openRegisterModal }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setErrors({ email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    let valid = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post("/api/users/loginUser", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        setOpenModal(false);
        localStorage.setItem("userDetails", JSON.stringify({ token: response.data.token }));
        setSnackMessage("Login successful!");
        setStatusCode(response.status);
        setShowSnackBar(true);
        window.location.reload();  // This will reload the entire page

      } else {
        setSnackMessage(response.data.message || "Login failed");
        setStatusCode(response.status);
        setShowSnackBar(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setSnackMessage(error.response?.data?.message || "Something went wrong.");
      setStatusCode(error.response?.status || 500);
      setShowSnackBar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Before-Login text-center lg:p-5">
      <Button
        variant="contained"
        style={{ backgroundColor: "#e91e63", color: "white", padding: "10px 20px", fontSize: "16px", fontWeight: "bold" }}
        onClick={handleOpen}
        className="hover:bg-pink-700 transition"
      >
        Login
      </Button>

      <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="xs">
        <div className="p-6 bg-white rounded-2xl shadow-xl relative">
          <IconButton className="absolute top-2 right-2" onClick={handleClose}>
            <CancelIcon />
          </IconButton>
          <DialogTitle className="text-center text-xl font-semibold">Login Form</DialogTitle>

          <div className="text-right text-sm flex justify-end">
            Not Registered ? - <button className="text-blue-500" onClick={openRegisterModal}>Register here</button>
          </div>

          <DialogContent className="flex flex-col gap-4 mt-4">
            <div className="flex items-center bg-gray-100 p-3 rounded-xl">
              <AlternateEmailIcon className="mr-3 text-custom-maroon" />
              <TextField
                name="email"
                placeholder="Email Address"
                fullWidth
                variant="standard"
                InputProps={{ disableUnderline: true }}
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>
            <div className="flex items-center bg-gray-100 p-3 rounded-xl">
              <PasswordIcon className="mr-3 text-custom-maroon" />
              <TextField
                name="password"
                type="password"
                placeholder="Your Password"
                fullWidth
                variant="standard"
                InputProps={{ disableUnderline: true }}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </div>

            <Button
              fullWidth
              className="mt-4 py-3 bg-pink-500 text-white hover:bg-pink-700 transition"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
            </Button>
          </DialogContent>
        </div>
      </Dialog>

      <SnackBarr
        message={snackMessage}
        statusCode={statusCode}
        showSnackBar={showSnackBar}
      />
    </div>
  );
};

export default BeforeLogin;
