import Link from "next/link";
import type { FC, PropsWithChildren } from "react";
import React from "react";

import styles from "./Menu.module.scss";
import type { MenuItemProps } from "./MenuProps";

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({
  url,
  onClose,
  children,
  className,
}) => {
  return url ? (
    <Link href={url}>
      <div
        className={`${styles.menu__item} ${className || ""}`}
        onClick={() => {
          if (onClose) onClose();
        }}
      >
        {children}
      </div>
    </Link>
  ) : (
    <div
      className={`${styles.menu__item} ${className || ""}`}
      onClick={() => {
        if (onClose) onClose();
      }}
    >
      {children}
    </div>
  );
};

export default MenuItem;
