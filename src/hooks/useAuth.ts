"use client";

// eslint-disable-next-line simple-import-sort/imports
import type { IUser } from "@/types";
// import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useAppSelector from "./useAppSelector";
import { useLogoutUser } from "./useLogoutUser";
import useUserData from "./useUserData";

const useAuth = (noAuth?: boolean | undefined) => {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  const { user } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.user);
  // const userData = useUserData();
  const [authData, setAuthData] = useState<IUser | null>(null);
  const endUserSession = useLogoutUser();

  useEffect(() => {
    (async () => {
      if (user && token) {
        setAuthData(user);
      } else if ((!user || !token) && !noAuth) {
        endUserSession();
      }
    })();
    setIsAuthenticating(false);
    // return () => setIsAuthenticating(false);
  }, [isAuthenticating, user]);

  const isAuthenticated = !!token && !!authData;
  useUserData({ skip: !isAuthenticated });

  return {
    isAuthenticated,
    authData,
    isAuthenticating,
  };
};

export default useAuth;
