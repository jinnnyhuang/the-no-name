import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: localStorage.getItem("isLogin") ? true : false,
  },
  reducers: {
    setCredentials: (state) => {
      state.isLogin = true;
      localStorage.setItem("isLogin", true);
    },
    logout: (state) => {
      state.isLogin = false;
      localStorage.removeItem("isLogin");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
