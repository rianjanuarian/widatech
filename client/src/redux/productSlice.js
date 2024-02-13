import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { productsAPI } from "../api/apiList";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get(productsAPI);
    return response.data;
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${productsAPI}/delete/${id}`);
    return id;
  }
);

export const saveProducts = createAsyncThunk(
  "products/saveProduct",
  async ({ name, image, stock, price }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("stock", stock);
    formData.append("price", price);
    const response = await axios.post(`${productsAPI}/create`, formData);
    return response.data;
  }
);

export const updateProducts = createAsyncThunk(
  "products/updateProduct",
  async ({ id, name, image, stock, price }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("stock", stock);
    formData.append("price", price);
    const response = await axios.put(`${productsAPI}/update/${id}`, formData);
    return response.data;
  }
);

const productEntity = createEntityAdapter({
  selectId: (products) => products.id,
});

const productSlice = createSlice({
  name: "products",
  initialState: productEntity.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "success";
        productEntity.setAll(state, action.payload);
      })
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      productEntity.removeOne(state, action.payload.id);
    });
    builder.addCase(saveProducts.fulfilled, (state, action) => {
      productEntity.addOne(state, action.payload.id);
    });
    builder.addCase(updateProducts.fulfilled, (state, action) => {
      productEntity.updateOne(state, {
        id: action.payload.id,
        changes: action.payload.data,
      });
    });
  },
});
export const productSelectors = productEntity.getSelectors(
  (state) => state.products
);

export default productSlice.reducer;
