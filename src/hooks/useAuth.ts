"use client";

// eslint-disable-next-line simple-import-sort/imports

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  selectIsUserActivated,
  selectUser,
} from "@/store/selector/user.selector";

import useAppSelector from "./useAppSelector";
import { useLogoutUser } from "./useLogoutUser";
import { useUserData } from "./useUserData";

const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  const [authData, setAuthData] = useState<boolean | null>(null);
  const userStore = useAppSelector(selectUser);
  const userStoreId = userStore?.id;
  const isUserActivated = useAppSelector(selectIsUserActivated);
  const userId = useUserData()?.id;
  const isUserDataActivated = useUserData()?.suspended;

  const endUserSession = useLogoutUser();
  const router = useRouter();
  const pathname = usePathname();
  // @ts-ignore
  const locationFrom = useSearchParams().get("clfrm");

  useEffect(() => {
    router.prefetch("/verify");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userId) {
      if (
        (!isAuthenticating && !isUserActivated) ||
        (!isAuthenticating && isUserDataActivated)
      ) {
        setAuthData(!!userId);
        if (pathname !== "/verify") router.push(`/verify?clfrm=${pathname}`);
      } else if (!isAuthenticating && userStore) {
        setAuthData(!!userStore || !!userId);
        if (pathname === "/verify")
          router.push(locationFrom || "/user/dashboard");
      } else if (!isAuthenticating && !userStoreId && !userId) {
        endUserSession();
      }
      setIsAuthenticating(false);
    }
  }, [isAuthenticating, userId]);

  return {
    isAuthenticated: !!authData,
    authData,
    isAuthenticating,
  };
};

export default useAuth;
