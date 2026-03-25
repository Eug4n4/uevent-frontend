import type { AuthResponse } from "@/lib/services/types/auth.types";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthResponse | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
})
export const { loginSuccess, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;