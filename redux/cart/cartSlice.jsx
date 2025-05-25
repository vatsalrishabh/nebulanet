 'use client';
 import { createSlice } from "@reduxjs/toolkit";

 const cartSlice = createSlice({
    name:'cart',
    initialState:[
    ],
    reducers:{
        addItem: (state, action) => {
            const existingItem = state.find((item) => item.id === action.payload.id);
            if (existingItem) {
              existingItem.quantity++;
            } else {
              state.push(action.payload);
            }
          },
          removeItem: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
          },
          updateQuantity: (state, action) => {
            const itemToUpdate = state.find((item) => item.id === action.payload.id);
            if (itemToUpdate) {
              itemToUpdate.quantity = action.payload.quantity;
            }
          },
          clearCart: (state) => {
              return []; // Return an empty array to clear the cart
          }
    }
 });

export const {addItem, removeItem , updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;