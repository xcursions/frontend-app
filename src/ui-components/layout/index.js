/* eslint-disable import/extensions */

'use client';

/* eslint-disable no-unneeded-ternary */
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import FullPageLoader from '@/components/lib/FullPageLoader';
import { useAppSelector, useAuth } from '@/hooks';
import Header from '../Header';
import SidebarNavigation from '../SidebarNavigation';
import CalendarComponent from '../Calendar/Calendar';

const Layout = ({ children }) => {
  const [sidebarMenuActive, setSidebarMenuActive] = useState(true);

  const toggleSidebarMenu = () => setSidebarMenuActive(!sidebarMenuActive);
  const showSidebarMenu = () => setSidebarMenuActive(true);

  useEffect(() => {
    setSidebarMenuActive(window.innerWidth > 768 ? true : false);
  }, []);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAuth(true);

  useEffect(() => {
    if (!user?.suspended && user?.profile?.id) {
      router.push(`${pathname}`);
    } else {
      router.push('/login');
    }
  }, [user, router, pathname]);
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
            showSidebarMenu={showSidebarMenu}
          />
          <CalendarComponent />
          <section className="content">{children}</section>
        </>
      )}
    </>
  );
};

export default Layout;
