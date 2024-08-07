import { useRouter } from "next/navigation";

import { logout } from "@/store/slices/userSlice";

import useAppDispatch from "./useAppDispatch";

export const useLogoutUser = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const clearUserStorage = () => {
    dispatch(logout());
    router.push("/login");
  };

  /**
   * @param id
   * set a custom id to identify the hook
   * @param callback invoke custom callback
   */
  return (id?: string, callback?: () => void) => {
    // eslint-disable-next-line no-console
    if (id) console.error(id);
    if (callback) callback();
    clearUserStorage();
  };
};
