import { createSlice, type PayloadAction, type Slice } from "@reduxjs/toolkit";
import type { TokenResponse, User } from "@/interfaces/authentication.ts";

export interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  access: null,
  refresh: null,
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice: Slice<AuthState> = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<TokenResponse>) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.access = action.payload.access;
      if (action.payload.refresh) {
        state.refresh = action.payload.refresh;
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null;
    },
    refreshAccess: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
    },
    rehydrateTokens(state, action: PayloadAction<TokenResponse>) {
      state.access = action.payload.access;
      if (action.payload.refresh) {
        state.refresh = action.payload.refresh;
      }
    },
    isLoggedIn(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logout,
  loginFailure,
  refreshAccess,
  rehydrateTokens,
  setUser,
  isLoggedIn,
} = authSlice.actions;
export default authSlice.reducer;
