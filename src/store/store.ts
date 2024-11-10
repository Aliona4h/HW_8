import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
