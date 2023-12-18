"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import FullPageLoader from "@/components/lib/FullPageLoader";
import { useAuth } from "@/hooks";
import { useOnboardingChecker } from "@/hooks/useOnboardingChecker";

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
  const [domLoading, setDomLoading] = useState<boolean>(true);
  const { isAuthenticated, authData } = useAuth();
  const onboardingCheck = useOnboardingChecker();
  // useEffect(() => {
  //   if (!user?.suspended && user?.profile?.id && token) {
  //     router.push(`${pathname}`);
  //   } else {
  //     router.push("/login");
  //   }
  // }, [user, router, pathname]);
  useEffect(() => {
    if (isAuthenticated) {
      onboardingCheck(authData);
    }
    setDomLoading(false);
    // return () => setDomLoading(false);
  }, [isAuthenticated]);
  return (
    <>
      {domLoading || !isAuthenticated ? (
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
