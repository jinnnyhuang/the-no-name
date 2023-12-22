import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: null, // { title, description, actionButton (String) }
  },
  reducers: {
    openModal: (state, action) => {
      state.modal = action.payload;
    },
    closeModal: (state) => {
      state.modal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
