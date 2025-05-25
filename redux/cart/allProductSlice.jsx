"use client";
import { createSlice } from "@reduxjs/toolkit";

const allProductSlice = createSlice({
    name: "allProducts",
    initialState: {
      products: [],
    },
    reducers: {
      setProducts: (state, action) => {
        state.products = action.payload; // ✅ Correct way to update state
      },
    },
  });
  
  export const { setProducts } = allProductSlice.actions;
  export default allProductSlice.reducer;
  