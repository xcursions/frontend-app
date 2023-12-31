/* eslint-disable no-nested-ternary */
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";

import styles from "./dropdown.module.scss";

interface DropdownMenuProps {
  children: ReactNode;
  label?: ReactNode;
  CustomMenu?: React.ComponentType<any>;
  dropdownContainerStyle?: React.CSSProperties;
  count?: number | null;
  screenCenter?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  label = null,
  CustomMenu = null,
  dropdownContainerStyle = {},
  count = null,
  screenCenter = true,
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleDropdownMenu = () => {
    setDropdownActive(!dropdownActive);
  };

  useEffect(() => {
    const handleOutsideClick = (e: { target: any }) => {
      const isDropdownClicked = dropdownRef.current?.contains(e.target);
      const isMenuClicked = menuRef.current?.contains(e.target);

      if (
        dropdownRef.current !== null &&
        (isDropdownClicked || isMenuClicked)
      ) {
        setDropdownActive(true);
      } else {
        setDropdownActive(false);
      }
    };

    if (dropdownActive) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownActive]);

  return (
    <div className={styles["dropdown-menu"]}>
      <div ref={menuRef} style={{ cursor: "pointer" }}>
        {CustomMenu ? (
          <CustomMenu onClick={handleDropdownMenu} />
        ) : label ? (
          <span onClick={handleDropdownMenu}>{label}</span>
        ) : null}
        {count && (
          <span className={styles["notification-counts"]}>{count}</span>
        )}
      </div>

      <div
        ref={dropdownRef}
        className={`${styles["dropdown-container"]} ${
          dropdownActive ? styles.active : ""
        }`}
        style={dropdownContainerStyle}
      >
        {screenCenter ? (
          <div className={styles["dropdown-sm-container"]}>
            <button
              className={styles["dropdown-close-btn"]}
              onClick={() => setDropdownActive(false)}
            >
              <IoIosClose />
            </button>
            {children}
          </div>
        ) : (
          <div className={""}>
            <button
              className={styles["dropdown-close-btn"]}
              onClick={() => setDropdownActive(false)}
            >
              <IoIosClose />
            </button>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
