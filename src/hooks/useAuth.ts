// eslint-disable-next-line simple-import-sort/imports
import type { IUser } from "@/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useAppSelector from "./useAppSelector";
import { useLogoutUser } from "./useLogoutUser";
import useUserData from "./useUserData";

const useAuth = (noAuth?: boolean | undefined) => {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  const { user } = useAppSelector((state) => state.user);
  // const userData = useUserData();
  const [authData, setAuthData] = useState<IUser | null>(null);
  const endUserSession = useLogoutUser();

  const token = Cookies.get("xcursions-token");

  useEffect(() => {
    (async () => {
      if (!isAuthenticating && user && token) {
        setAuthData(user);
      } else if ((!user || !token) && !isAuthenticating && !noAuth) {
        endUserSession("log");
      }
    })();
    setIsAuthenticating(false);
    // return () => setIsAuthenticating(false);
  }, [isAuthenticating]);

  const isAuthenticated = !!token && !!authData;
  useUserData({ skip: !isAuthenticated });

  return {
    isAuthenticated,
    authData,
    isAuthenticating,
  };
};

export default useAuth;
