import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserObj } from "../types";
import { getTokens } from "../utils/helpers";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserObj | null;
}

const initialState: AuthState = {
  accessToken: "null", // getTokens().access_token,
  refreshToken: "null", // getTokens().refresh_token,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<Tokens>) => {
      state.accessToken = action.payload.accessToken;
      state.accessToken = action.payload.refreshToken;
    },
    logoutUser: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

// action creators
export const { loginUser, logoutUser } = authSlice.actions;

// reducer
export default authSlice.reducer;
