import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct:(state, action) => {
            //action.payload represents every order; when add button is clicked, this returns that order
            state.quantity += action.payload.quantity;
            state.products.push(action.payload);
            state.total += action.payload.hasDiscount ? action.payload.newPrice*action.payload.quantity : action.payload.price*action.payload.quantity;
        },
        deleteProductInCart:(state,action) => { 
            // state.products.splice(
            //     state.products.findIndex((item) => item._id === action.payload._id),
            //     1
            // );  
            state.products = state.products.filter(product => product._id !== action.payload._id);
            state.quantity -= action.payload.quantity;
            state.total -= action.payload.hasDiscount ? action.payload.newPrice*action.payload.quantity : action.payload.price*action.payload.quantity;
        },
        deleteAllProducts:(state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    },
});

export const { addProduct, deleteProductInCart, deleteAllProducts} = cartSlice.actions;
export default cartSlice.reducer;