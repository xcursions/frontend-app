import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toaster from "react-hot-toast";

import { logout } from "@/store/slices/userSlice";

import useAppDispatch from "./useAppDispatch";

const useErrorHandler = ({
  isError,
  error,
  showToast = true,
  errorFunction,
}: {
  isError: boolean;
  error: any;
  showToast?: boolean;
  errorFunction?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isError && showToast) {
      toaster.error(
        error?.data?.meta?.message || "Something went wrong, try again later."
      );
    }
  }, [isError]);

  useEffect(() => {
    if (isError) {
      if (errorFunction) {
        errorFunction();
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isError) {
      if (error?.data?.error_code === 143) {
        dispatch(logout());
        router.push("/login");
      }
    }
  }, [isError]);
};

export default useErrorHandler;
