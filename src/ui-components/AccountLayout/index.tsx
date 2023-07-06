/* eslint-disable no-unneeded-ternary */
import { useEffect, useState } from "react";

import SidebarNavigation from "./SidebarNavigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarMenuActive, setSidebarMenuActive] = useState(true);

  const toggleSidebarMenu = () => setSidebarMenuActive(!sidebarMenuActive);
  // const showSidebarMenu = () => setSidebarMenuActive(true);

  useEffect(() => {
    setSidebarMenuActive(window.innerWidth > 768 ? true : false);
  }, []);
  return (
    <>
      <SidebarNavigation
        toggleSidebarMenu={toggleSidebarMenu}
        sidebarMenuActive={sidebarMenuActive}
      />
      <section className="content">{children}</section>
    </>
  );
};

export default Layout;
