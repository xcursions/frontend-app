/* eslint-disable @typescript-eslint/dot-notation */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import HeaderSection from "@/ui-components/HeaderSection";

import routes from "../routes";
import styles from "./SidebarNavigation.module.scss";

const SidebarNavigation = ({ sidebarMenuActive }: any) => {
  const Pathname = usePathname();

  return (
    <section
      className={`${styles.container} ${
        sidebarMenuActive ? styles["active"] : ""
      }`}
    >
      {/* <button
        className={styles["sidebar-close-btn"]}
        onClick={toggleSidebarMenu}
      >
        x
      </button> */}
      <div className={styles["logo-container"]}>
        <HeaderSection
          heading={"Account"}
          subHeading={"Welcome back to your dashboard"}
        />
      </div>
      <ul className={styles["sidebar-container"]}>
        {routes.map((page, index) => (
          <li
            key={index}
            className={`${styles["sidebar-menu-item"]} ${
              Pathname === page.to ? styles["active"] : ""
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
