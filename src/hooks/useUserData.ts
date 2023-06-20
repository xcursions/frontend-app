// eslint-disable-next-line simple-import-sort/imports
import { useGetUserQuery } from "@/services/auth";
import { setUserData } from "@/store/slices/userSlice";
import { useEffect } from "react";
import useAppDispatch from "./useAppDispatch";

const useUserData = ({ skip }: { skip: boolean | undefined }) => {
  const dispatch = useAppDispatch();
  const {
    data: userData,
    isSuccess: isUserDataSuccess,
    isFetching: isUserDataLoading,
  } = useGetUserQuery(
    {},
    {
      skip,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (userData && !isUserDataLoading && isUserDataSuccess)
      dispatch(setUserData(userData?.data));
  }, [userData, isUserDataSuccess, isUserDataLoading]);
  return userData ? userData.data : undefined;
};

export default useUserData;
