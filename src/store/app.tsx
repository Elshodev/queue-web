import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StateAction {}

const initialState: StateAction = {};

const appStore = create(
  devtools(() => ({
    ...initialState,
  }))
);

export default appStore;
