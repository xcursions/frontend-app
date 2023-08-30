// eslint-disable-next-line simple-import-sort/imports
import type { IUser } from "@/types";
import { useRouter, usePathname } from "next/navigation";

export const useOnboardingChecker = () => {
  const router = useRouter();
  const pathname = usePathname();

  const fallBackToOnboarding = (_state: IUser | null) => {
    switch (_state?.suspended) {
      case false:
        return router.push(`${pathname}`);
      case true:
        return router.push("/login");
      default:
        return null;
    }
  };

  return (data: IUser | null) => {
    if (data?.role.includes("regular" || "admin")) {
      router.push(`${pathname}`);
    } else if (!data) {
      router.push(`/login`);
    } else {
      fallBackToOnboarding(data);
    }
  };
};
