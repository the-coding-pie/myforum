import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserObj } from "../types";
import { getTokens } from "../utils/helpers";

interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserObj | null;
}

const initialState: AuthState = {
  accessToken: getTokens().access_token,
  refreshToken: getTokens().refresh_token,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<Tokens>) => {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
    logoutUser: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    setAccessToken: (
      state,
      action: PayloadAction<{ access_token: string }>
    ) => {
      state.accessToken = action.payload.access_token;
    },
  },
});

// action creators
export const { loginUser, logoutUser, setAccessToken } = authSlice.actions;

// reducer
export default authSlice.reducer;
