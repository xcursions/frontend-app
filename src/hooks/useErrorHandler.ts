import { useEffect } from "react";
import toaster from "react-hot-toast";

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

  // useEffect(() => {
  //   if (isError) {
  //     if (error?.data?.meta?.statusCode === 499) {
  //       dispatch(logout());
  //       router.push("/login");
  //     }
  //   }
  // }, [isError]);
};

export default useErrorHandler;
