/* eslint-disable no-unneeded-ternary */

"use client";

import { useEffect, useState } from "react";

import SidebarNavigation from "./SidebarNavigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarMenuActive, setSidebarMenuActive] = useState(true);

  // const toggleSidebarMenu = () => setSidebarMenuActive(!sidebarMenuActive);
  // const showSidebarMenu = () => setSidebarMenuActive(true);

  useEffect(() => {
    setSidebarMenuActive(window.innerWidth > 1023 ? true : false);
  }, []);
  return (
    <>
      <SidebarNavigation
        // toggleSidebarMenu={toggleSidebarMenu}
        sidebarMenuActive={sidebarMenuActive}
      />
      <section
        className={`${
          sidebarMenuActive ? "content2" : "left-0 w-full"
        } bg-[#F2F4F7]`}
      >
        {children}
      </section>
    </>
  );
};

export default Layout;
