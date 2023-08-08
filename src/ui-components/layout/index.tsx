"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import FullPageLoader from "@/components/lib/FullPageLoader";
import { useAppSelector, useAuth } from "@/hooks";
import { useGetUserQuery } from "@/services/user";

import CalendarComponent from "../Calendar/Calendar";
import Header from "../Header";
import SidebarNavigation from "../SidebarNavigation";

const Layout = ({ children }: any) => {
  const [sidebarMenuActive, setSidebarMenuActive] = useState(true);

  const toggleSidebarMenu = () => setSidebarMenuActive(!sidebarMenuActive);
  const showSidebarMenu = () => setSidebarMenuActive(true);

  useEffect(() => {
    // eslint-disable-next-line no-unneeded-ternary
    setSidebarMenuActive(window.innerWidth > 768 ? true : false);
  }, []);
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAuth(true);
  const { data, isSuccess } = useGetUserQuery();

  const userExists = isSuccess && data?.data?.id;
  useEffect(() => {
    if (!user?.suspended && user?.profile?.id && token && userExists) {
      router.push(`${pathname}`);
    } else {
      router.push("/login");
    }
  }, [user, router, pathname, isSuccess, data]);
  return (
    <>
      {!isAuthenticated ? (
        <FullPageLoader />
      ) : (
        <>
          <SidebarNavigation
            toggleSidebarMenu={toggleSidebarMenu}
            sidebarMenuActive={sidebarMenuActive}
          />
          <Header
            toggleSidebarMenu={toggleSidebarMenu}
            // @ts-ignore
            showSidebarMenu={showSidebarMenu}
          />
          {pathname !== "/user/account" &&
            pathname !== "/user/account/favourite" &&
            pathname !== "/user/wallet/history" &&
            pathname !== "/user/booking/history" && <CalendarComponent />}
          <section className="content">{children}</section>
        </>
      )}
    </>
  );
};

export default Layout;
