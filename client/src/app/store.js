import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux/productSlice";
import invoiceSlice from "../redux/invoiceSlice";
export const store = configureStore({
    reducer: {
     products: productSlice,
     invoices: invoiceSlice
    },
  });