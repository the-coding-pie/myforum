import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastObj } from "../types";
import { DEFAULT, ERROR, SUCCESS, WARNING } from "../types/constants";
import * as _ from "lodash";

interface ToastState {
  toasts: ToastObj[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastObj>) => {
      // if the new toast already doesn't exists on the array, then only include it
      let contains = false;

      state.toasts.forEach((t) => {
        if (_.isEqual(t, action.payload)) {
          contains = true;
        }
      });

      if (!contains) {
        state.toasts.push(action.payload);
      }
    },
    removeToast: (state, action: PayloadAction<ToastObj>) => {
      state.toasts = state.toasts.filter((t) => !_.isEqual(t, action.payload));
    },
    emptyToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, emptyToasts } = toastSlice.actions;

export default toastSlice.reducer;
