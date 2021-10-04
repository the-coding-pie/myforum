import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserObj } from "../types";
import {
  getTokens,
  removeTokens,
  saveAccessTokens,
  saveTokens,
} from "../utils/helpers";

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
    emptyRefreshToken: (state) => {
      state.accessToken = null;
    },
    loginUser: (state, action: PayloadAction<Tokens>) => {
      const { access_token, refresh_token } = action.payload;

      state.accessToken = access_token;
      state.refreshToken = refresh_token;

      saveTokens(access_token, refresh_token);
    },
    logoutUser: (state) => {
      removeTokens();

      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    setAccessToken: (
      state,
      action: PayloadAction<{ access_token: string }>
    ) => {
      state.accessToken = action.payload.access_token;

      saveAccessTokens(action.payload.access_token);
    },
    setCurrentUser: (state, action: PayloadAction<UserObj>) => {
      state.user = action.payload;
    },
  },
});

// action creators
export const { loginUser, emptyRefreshToken, logoutUser, setAccessToken, setCurrentUser } =
  authSlice.actions;

// reducer
export default authSlice.reducer;
