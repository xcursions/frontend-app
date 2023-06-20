// eslint-disable-next-line simple-import-sort/imports
import { useAppDispatch } from "@/hooks";
import { setUserData } from "@/store/slices/userSlice";
import type { FC, PropsWithChildren } from "react";
import { useEffect } from "react";

const AuthCheck: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("xcursions-user");
    if (userData) {
      dispatch(setUserData(JSON.parse(userData)));
    }
  }, []);

  return <>{children}</>;
};

export default AuthCheck;
