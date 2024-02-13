import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux/productSlice";
export const store = configureStore({
    reducer: {
     products: productSlice
    },
  });