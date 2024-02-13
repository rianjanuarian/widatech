import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { invoiceAPI } from "../api/apiList";

export const getInvoice = createAsyncThunk("invoices/getInvoice", async () => {
  const response = await axios.get(invoiceAPI);
  return response.data;
});

export const saveInvoices = createAsyncThunk(
  "invoices/saveInvoice",
  async ({ customer, salesperson, notes, productsold, productId }) => {
    const response = await axios.post(`${invoiceAPI}/create`, {
      customer,
      salesperson,
      notes,
      productsold,
      productId,
    });
    return response.data;
  }
);
export const deleteInvoices = createAsyncThunk(
  "invoice/deleteInvoice",
  async (id) => {
    await axios.delete(`${invoiceAPI}/delete/${id}`);
    return id;
  }
);

export const detailInvoices = createAsyncThunk(
  "invoice/detailInvoice",
  async (id) => {
    const response = await axios.get(`${invoiceAPI}/detail/${id}`);
    console.log(response.data);
    return response.data;
  }
);

const invoiceEntity = createEntityAdapter({
  selectId: (invoices) => invoices.id,
});

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: invoiceEntity.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.status = "success";
        invoiceEntity.setAll(state, action.payload);
      })
      .addCase(getInvoice.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
    builder.addCase(detailInvoices.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
    builder.addCase(deleteInvoices.fulfilled, (state, action) => {
      invoiceEntity.removeOne(state, action.payload.id);
    });
    builder.addCase(saveInvoices.fulfilled, (state, action) => {
      invoiceEntity.addOne(state, action.payload.id);
    });
  },
});

export const invoiceSelectors = invoiceEntity.getSelectors(
  (state) => state.invoices
);
export default invoiceSlice.reducer;
