import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem("token")),
  token: localStorage.getItem("token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      localStorage.setItem("token", token);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
