import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collectionItems: [],
  },
  reducers: {
    addCollection(state, aciton) {
      const itemsIndex = state.collectionItems.findIndex((item) => item._id === aciton.payload._id);
      itemsIndex === -1 && state.collectionItems.push(aciton.payload);
    },
    removeCollection(state, aciton) {
      state.collectionItems = state.collectionItems.filter((item) => item._id !== aciton.payload._id);
    },
  },
});

export const { addCollection, removeCollection } = collectionSlice.actions;
export const collectionReducer = collectionSlice.reducer; // 沒有s
