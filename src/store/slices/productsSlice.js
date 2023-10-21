import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_API_URL || "http://localhost:3001/";

export const fetchProducts = createAsyncThunk("prodcuts/fetchProducts", async () => {
  const data = await axios.get(`${base_url}products`).then((res) => res.data);
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const productsReducer = productsSlice.reducer;
