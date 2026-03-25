import type { AuthResponse } from "@/lib/services/types/auth.types";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  user: AuthResponse | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
})
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;