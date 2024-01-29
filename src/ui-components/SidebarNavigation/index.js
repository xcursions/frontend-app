/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
/* eslint-disable dot-notation */
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/lib/Logo";
import Image from "next/image";
import styles from "./SidebarNavigation.module.css";
import routes from "../../routes";

const SidebarNavigation = ({ sidebarMenuActive, toggleSidebarMenu }) => {
  const Pathname = usePathname();

  const isActive = (path) => {
    return Pathname === path || Pathname.startsWith(`${path}/`);
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
        X
      </button>
      <div className={styles["logo-container"]}>
        <Logo type="white" />
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
              <span className="text-[14px] font-normal">{page.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className={styles["sidebar-footer"]}>
        {/* <button onClick={toggleSidebarMenu}>close</button> */}
        <li className={styles["footer-item"]}>
          <Image
            width={250}
            height={241}
            src="/assets/images/Ad2.png"
            alt="advert"
            className="mx-auto mb-3 max-h-[140px] max-w-[190px] xl:max-h-[240px] xl:max-w-[230px]"
            priority
          />
        </li>
      </ul>
    </section>
  );
};

export default SidebarNavigation;
