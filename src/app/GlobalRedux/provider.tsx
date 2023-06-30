"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";
import React from "react";
import { Provider } from "react-redux";

import { store } from "@/store";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
        {children}
      </GoogleOAuthProvider>
    </Provider>
  );
}
