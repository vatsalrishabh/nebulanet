"use client";
import React from 'react';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import RightSlideCart from '../RightSlideCart';
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../../redux/cart/openCartSlice";

const RightIconSmartphone = () => {
    const dispatch = useDispatch();
    const { numOfItems } = useSelector((state) => state.openCart);

    const handleCartClick = () => {
        dispatch(toggleCart()); // Toggle the cart open/close
    };

    return (
        <div>
            {/* Floating Shopping Cart Icon with Badge */}
            <motion.div 
                onClick={handleCartClick}
                initial={{ y: -10, opacity: 0 }}  
                animate={{ y: 0, opacity: 1 }}  
                transition={{ type: "spring", stiffness: 100 }}
                className="fixed bottom-5 right-5 bg-pink-500 text-white p-4 rounded-full shadow-lg 
                           hover:scale-110 hover:shadow-xl 
                           active:scale-90 transition-all duration-300 ease-in-out cursor-pointer"
            >
                <Badge badgeContent={numOfItems} color="error" sx={{ fontSize: 16 }}>
                    <ShoppingCartIcon sx={{ fontSize: 30 }} />
                </Badge>
            </motion.div>

            {/* Sliding Cart */}
            <RightSlideCart />
        </div>
    );
};

export default RightIconSmartphone;
