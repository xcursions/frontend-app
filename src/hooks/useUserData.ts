// eslint-disable-next-line simple-import-sort/imports
import { useGetUserQuery } from "@/services/user";
import { setUserData } from "@/store/slices/userSlice";
import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import useAppDispatch from "./useAppDispatch";

export const useUserData = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const {
    data: userData,
    isSuccess: isUserDataSuccess,
    isFetching: isUserDataLoading,
  } = useGetUserQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (userData && !isUserDataLoading && isUserDataSuccess) {
      dispatch(setUserData(userData));
    }
  }, [dispatch, userData, isUserDataSuccess, isUserDataLoading, pathname]);
  const result = useMemo(() => userData || undefined, [userData]);
  return result;
};
