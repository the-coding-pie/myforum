import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokens } from "../utils/helpers";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: Object | null;
}

const initialState: AuthState = {
  accessToken: "sdafds", // getTokens().access_token,
  refreshToken: "sdafds", // getTokens().refresh_token,
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
export const { loginUser } = authSlice.actions;

// reducer
export default authSlice.reducer;
