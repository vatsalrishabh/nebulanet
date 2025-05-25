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
  Person,
  InstallMobile as InstallMobileIcon,
  Cancel as CancelIcon,
  Password
} from "@mui/icons-material";
import axios from "axios";
import SnackBarr from "../SnackBarr";

const RegisterUser = ({ openLoginModal, openModall }) => {
  const [openModal, setOpenModal] = useState(openModall);
  const [otpModal, setOtpModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", mobile: "", password: "" });
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    statusCode: null,
    show: false,
  });

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setErrors({ name: "", email: "", mobile: "" });
  };

  const handleOtpClose = () => {
    setOtpModal(false);
    setOtp("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = { name: "", email: "", mobile: "" };
    let valid = true;
    if (formData.name.length < 4) {
      newErrors.name = "Name must be at least 4 characters long.";
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post("/api/users/registerUser", formData);
        if (response.status === 201) {
          setOtpModal(true);
          setOpenModal(false);
          setSnackbar({ message: "Registration successful! Please verify OTP.", statusCode: 201, show: true });
        } else {
          setSnackbar({ message: "Something went wrong, please try again.", statusCode: response.status, show: true });
        }
      } catch (error) {
        console.error("Error:", error);
        setSnackbar({ message: "Error during registration, please try again.", statusCode: 500, show: true });
      } finally {
        setLoading(false);
      }
    }
  };

  const verifyOtp = () => {
    axios
      .post("/api/users/verifyOtp", {
        email: formData.email,
        name: formData.name,
        mobile: formData.mobile,
        password: formData.password,
        otp,
      })
      .then((response) => {
        if (response.status === 201) {
          setSnackbar({ message: "User created successfully!", statusCode: 201, show: true });
          setOtpModal(false); // Close OTP modal
        } else {
          setSnackbar({ message: "Invalid OTP. Please try again.", statusCode: 400, show: true });
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        setSnackbar({ message: "Error verifying OTP. Please try again.", statusCode: 500, show: true });
      });
  };

  return (
    <div className="Before-Login text-center p-5">
      <SnackBarr 
        message={snackbar.message} 
        statusCode={snackbar.statusCode} 
        showSnackBar={snackbar.show} 
      />
      <Button
        variant="contained"
        style={{
          backgroundColor: "#e91e63",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
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
          <DialogTitle className="text-center text-xl font-semibold">
            Registration Form
          </DialogTitle>
          <div className="text-right text-sm flex justify-end">
            Already Registered? - <button className="text-blue-500" onClick={openLoginModal}>Login here</button>
          </div>

          <DialogContent className="flex flex-col gap-4 mt-4">
            <div className="flex items-center bg-gray-100 p-3 rounded-xl">
              <Person className="mr-3 text-custom-maroon" />
              <TextField
                name="name"
                placeholder="Your Name"
                fullWidth
                variant="standard"
                InputProps={{ disableUnderline: true }}
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </div>
            <div className="flex items-center bg-gray-100 p-3 rounded-xl">
              <Password className="mr-3 text-custom-maroon" />
              <TextField
                name="password"
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
              <InstallMobileIcon className="mr-3 text-custom-maroon" />
              <TextField
                name="mobile"
                placeholder="Mobile Number"
                fullWidth
                variant="standard"
                InputProps={{ disableUnderline: true }}
                value={formData.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
            </div>
            <Button
              fullWidth
              className="mt-4 py-3 bg-pink-500 text-white hover:bg-pink-700 transition"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogContent>
        </div>
      </Dialog>

      <Dialog open={otpModal} onClose={handleOtpClose} fullWidth maxWidth="xs">
        <div className="p-6 bg-white rounded-2xl shadow-xl relative">
          <IconButton className="absolute top-2 right-2" onClick={handleOtpClose}>
            <CancelIcon />
          </IconButton>
          <DialogTitle className="text-center text-xl font-semibold">Enter OTP</DialogTitle>
          <DialogContent className="flex flex-col items-center gap-4 mt-4">
            <TextField
              value={otp}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,6}$/.test(input)) {
                  setOtp(input);
                }
              }}
              variant="outlined"
              size="small"
              type="text"
              inputProps={{
                maxLength: 6,
                style: { textAlign: "center", fontSize: "20px", width: "240px" },
              }}
            />
            <Button
              fullWidth
              className="mt-4 py-3 bg-pink-500 text-white hover:bg-pink-700 transition"
              onClick={verifyOtp}
            >
              Verify OTP
            </Button>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default RegisterUser;
