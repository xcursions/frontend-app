// eslint-disable-next-line simple-import-sort/imports
import { logout } from "@/store/slices/userSlice";
import { loginRedirect } from "@/utils/serversideProps.helper";
import { useRouter, usePathname } from "next/navigation";
import useAppDispatch from "./useAppDispatch";

export const useLogoutUser = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const clearUserStorage = () => {
    dispatch(logout());
    const destination = loginRedirect(pathname !== null ? `${pathname}` : "/");
    router.push(destination);
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
