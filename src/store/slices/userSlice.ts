// eslint-disable-next-line simple-import-sort/imports
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { IUser } from "@/types";

const userToken =
  typeof window !== "undefined" && localStorage.getItem("xcursions-token");
const userData =
  typeof window !== "undefined" && localStorage.getItem("xcursions-user");

const persistedUserData: IUser | null = userData ? JSON.parse(userData) : null;
const persistedToken: string | null = userToken
  ? localStorage.getItem("xcursions-token")
  : null;

const initialState: {
  user: IUser | null;
  token: typeof persistedToken | null;
} = {
  user: persistedUserData,
  token: persistedToken || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<IUser>) {
      localStorage.setItem("xcursions-user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    setUserToken(state, action: PayloadAction<string>) {
      localStorage.setItem("xcursions-token", JSON.stringify(action.payload));
      state.token = action.payload;
    },
    // setUserToken(_state, action: PayloadAction<string>) {
    //   // state.token = action.payload;
    //   // localStorage.setItem('token', action.payload);
    //   Cookies.set("xcursions-token", action.payload, {
    //     expires: 7,
    //     sameSite: "strict",
    //   });
    // },
    logout(state) {
      localStorage.removeItem("xcursions-token");
      localStorage.removeItem("xcursions-user");
      Cookies.remove("xcursions-token");
      state.user = null;
    },
  },
});

export const { setUserData, setUserToken, logout } = userSlice.actions;
export default userSlice.reducer;
