// eslint-disable-next-line simple-import-sort/imports
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { IUser } from "@/types";

const userToken =
  typeof window !== "undefined" && localStorage.getItem("xcursions-token");
const userData =
  typeof window !== "undefined" && localStorage.getItem("xcursions-user");
const userAuth =
  typeof window !== "undefined" && localStorage.getItem("xcursions-auth");
const persistedUserData: IUser | null = userData ? JSON.parse(userData) : null;
const persistedToken: string | null = userToken
  ? localStorage.getItem("xcursions-token")
  : null;
const persistedAuth: string | null = userAuth
  ? localStorage.getItem("xcursions-auth")
  : null;

const initialState: {
  user: IUser | null;
  token: typeof persistedToken | null;
  auth: typeof persistedAuth | null;
} = {
  user: persistedUserData,
  token: persistedToken || null,
  auth: persistedAuth || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<IUser>) {
      localStorage.setItem("xcursions-user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    setUserAuthMethod(state, action: PayloadAction<string>) {
      localStorage.setItem("xcursions-auth", JSON.stringify(action.payload));
      state.auth = action.payload;
    },
    // setUserToken(state, action: PayloadAction<string>) {
    //   localStorage.setItem("xcursions-token", JSON.stringify(action.payload));
    //   state.token = action.payload;
    // },
    setUserToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("xcursions-token", action.payload);
      Cookies.set("xcursions-token", action.payload, {
        expires: 7,
        sameSite: "strict",
      });
    },
    logout(state) {
      localStorage.removeItem("xcursions-token");
      localStorage.removeItem("xcursions-user");
      localStorage.removeItem("xcursions-auth");
      Cookies.remove("xcursions-token");
      state.user = null;
    },
  },
});

export const { setUserData, setUserToken, setUserAuthMethod, logout } =
  userSlice.actions;
export default userSlice.reducer;
