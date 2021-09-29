import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastObj } from "../types";
import { DEFAULT, ERROR, SUCCESS, WARNING } from "../types/constants";
import * as _ from "lodash";

interface ToastState {
  toasts: ToastObj[];
}

const initialState: ToastState = {
  toasts: [
    {
      kind: ERROR,
      msg: "Ooah, Papa never loved me and she is loving someone else so deeply for a very long time",
    },
    {
      kind: ERROR,
      msg: "Ooah, Papa never loved me and she is loving someone else so deeply for a very long time",
    },
    {
      kind: DEFAULT,
      msg: "Ooah, Papa left me and she is loving someone else so deeply for a very long time",
    },
    {
      kind: SUCCESS,
      msg: "Ooah, Papa left me and she is loving someone else so deeply for a very long time",
    },
    {
      kind: WARNING,
      msg: "Ooah, Papa left me and she is loving someone else so deeply for a very long time",
    },
  ],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastObj>) => {
      // if the new toast already doesn't exists on the array, then only include it
      if (!state.toasts.includes(action.payload, 0)) {
        state.toasts.push(action.payload);
      }
    },
    removeToast: (state, action: PayloadAction<ToastObj>) => {
      state.toasts.filter((t) => !_.isEqual(t, action.payload));
    },
    emptyToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, emptyToasts } = toastSlice.actions;

export default toastSlice.reducer;
