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
const userBooking =
  typeof window !== "undefined" && localStorage.getItem("xcursions-booking");
const persistedUserData: IUser | null = userData ? JSON.parse(userData) : null;
const persistedBookings: any | null = userBooking
  ? JSON.parse(userBooking)
  : null;
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
  booking: any;
} = {
  user: persistedUserData,
  token: persistedToken || null,
  auth: persistedAuth || null,
  booking: persistedBookings || null,
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
    setUserBooking(state, action: PayloadAction<string>) {
      localStorage.setItem("xcursions-booking", JSON.stringify(action.payload));
      state.booking = action.payload;
    },
    // setUserToken(state, action: PayloadAction<string>) {
    //   localStorage.setItem("xcursions-token", JSON.stringify(action.payload));
    //   state.token = action.payload;
    // },
    setUserToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("xcursions-token", action.payload);
      Cookies.set("xcursions-token", action.payload, {
        expires: 1,
        sameSite: "strict",
      });
    },
    logout(state) {
      localStorage.removeItem("xcursions-token");
      localStorage.removeItem("xcursions-user");
      localStorage.removeItem("xcursions-auth");
      localStorage.removeItem("xcursions-booking");
      Cookies.remove("xcursions-token");
      state.user = null;
      state.token = null;
      state.booking = null;
    },
  },
});

export const {
  setUserData,
  setUserToken,
  setUserAuthMethod,
  logout,
  setUserBooking,
} = userSlice.actions;
export default userSlice.reducer;
