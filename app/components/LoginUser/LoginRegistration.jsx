//login and registratin for here and switching logic betweent two
import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure you have jwt-decode installed
import BeforeLogin from './BeforeLogin';
import RegisterUser from './RegisterUser';

const LoginRegistration = () => {
    const [showLogin, setShowLogin] = useState(true); // Show login by default
    const [openModall, setOpenModal] = useState(false); // Modal open state either login or registration
    const [loggedInUser, setLoggedInUser] = useState(null); // Track logged-in user

    // Function to get user details from localStorage
    const getUserDetails = () => {
        let storedUser = localStorage.getItem("userDetails");

        if (storedUser) {
            try {
                storedUser = JSON.parse(storedUser);
                const decodedToken = jwtDecode(storedUser.token);

                // Check if token is expired
                if (decodedToken.exp * 1000 < Date.now()) {
                    console.log("Session expired. Logging out...");
                    logoutUser();
                } else {
                    setLoggedInUser({
                        isLoggedIn: true,
                        token: storedUser.token,
                        userName: decodedToken.name,
                        userEmail: decodedToken.email,
                        userNumber: decodedToken.mobile, // Changed to userNumber
                    });
                }
            } catch (error) {
                console.error("Invalid token:", error);
                logoutUser();
            }
        }
    };

    // Log the user out
    const logoutUser = () => {
        localStorage.removeItem("userDetails");
        setLoggedInUser(null); // Clear user details from state
    };

    useEffect(() => {
        getUserDetails(); // Check if user is logged in on mount
    }, []);

    const openLoginModal = () => {
        setShowLogin(true); // Show login form
        setOpenModal(true); // Open modal
    };

    const openRegisterModal = () => {
        setShowLogin(false); // Show registration form
        setOpenModal(true); // Open modal
    };

    return (
        <div>
            {
                // If user is already logged in, display a message or redirect
                loggedInUser ? (
                    <div>
                        <h1>Welcome back, {loggedInUser.userName}!</h1>
                        {/* Optionally, add a logout button here */}
                        <button onClick={logoutUser}>Logout</button>
                    </div>
                ) : (
                    // If not logged in, show either the login or registration form based on state
                    <>
                        {
                            showLogin ? (
                                <BeforeLogin openRegisterModal={openRegisterModal}  openModall={openModall} />
                            ) : (
                                <RegisterUser openLoginModal={openLoginModal}  openModall={openModall} />
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

export default LoginRegistration;
