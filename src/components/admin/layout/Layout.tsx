"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import FullPageLoader from "@/components/lib/FullPageLoader";
import { useAppSelector, useAuth } from "@/hooks";

import Header from "../Header/Header";
import SidebarNavigation from "../SidebarNavigation/SidebarNavigation";

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
  const [domLoading, setDomLoading] = useState<boolean>(true);
  const [appConfig, setAppConfig] = useState(false);
  const { user } = useAppSelector((state) => state.user);
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
    if (user?.role === "admin") {
      router.push(`${pathname}`);
    } else {
      router.push("/admin/login");
    }
  }, [user, router, pathname]);
  return (
    <>
      {domLoading || !appConfig || !isAuthenticated ? (
        <FullPageLoader />
      ) : (
        <>
          {!pathname?.startsWith("/admin/login") && (
            <>
              {" "}
              <SidebarNavigation
                toggleSidebarMenu={toggleSidebarMenu}
                sidebarMenuActive={sidebarMenuActive}
              />
              <Header
                toggleSidebarMenu={toggleSidebarMenu}
                // @ts-ignore
                showSidebarMenu={showSidebarMenu}
              />
            </>
          )}

          <section className="content">{children}</section>
        </>
      )}
    </>
  );
};

export default Layout;
