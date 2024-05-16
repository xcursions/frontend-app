"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import FullPageLoader from "@/components/lib/FullPageLoader";
import { useAppSelector, useAuth } from "@/hooks";

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
  const pathname = usePathname();
  const router = useRouter();
  const [domLoading, setDomLoading] = useState<boolean>(true);
  const { user } = useAppSelector((state) => state.user);
  const [appConfig, setAppConfig] = useState(false);
  const { isAuthenticated, authData } = useAuth();

  useEffect(() => {
    if (authData) {
      setAppConfig(true);
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (authData && isAuthenticated) {
      setDomLoading(false);
    }
  }, [authData, isAuthenticated]);
  useEffect(() => {
    if (!user) {
      router.push(`/login?clfrm=${pathname}`);
    }
  }, [user, router, pathname]);
  useEffect(() => {
    setSidebarMenuActive(false);
  }, [pathname]);
  return (
    <>
      {domLoading || !appConfig || !isAuthenticated ? (
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
          <section
            className={
              pathname?.startsWith("/user/account") ? "content2" : "content"
            }
          >
            <section>{children}</section>
            <section>
              {!pathname?.startsWith("/user/account") &&
                !pathname?.startsWith("/user/wallet/") &&
                !pathname?.startsWith("/user/booking/") && (
                  <CalendarComponent />
                )}
            </section>
          </section>
        </>
      )}
    </>
  );
};

export default Layout;
