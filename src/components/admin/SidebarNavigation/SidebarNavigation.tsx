/* eslint-disable @typescript-eslint/dot-notation */
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/lib/Logo";

import routes from "../routes";
import styles from "./SidebarNavigation.module.css";

const SidebarNavigation = ({ sidebarMenuActive, toggleSidebarMenu }: any) => {
  const Pathname = usePathname();
  const isActive = (path: string) => {
    return Pathname === path || (Pathname && Pathname.startsWith(`${path}/`));
  };
  return (
    <section
      className={`${styles.container} ${
        sidebarMenuActive ? styles["active"] : ""
      }`}
    >
      <button
        className={styles["sidebar-close-btn"]}
        onClick={toggleSidebarMenu}
      >
        x
      </button>
      <div className={styles["logo-container"]}>
        <Logo type="main" />
      </div>
      <ul className={styles["sidebar-container"]}>
        {routes.map((page, index) => (
          <li
            key={index}
            className={`${styles["sidebar-menu-item"]} ${
              isActive(page.to) ? styles["active"] : ""
            }`}
          >
            <Link href={page.to}>
              <page.Icon />
              <span>{page.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SidebarNavigation;
