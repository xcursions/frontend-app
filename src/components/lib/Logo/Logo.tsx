/*eslint-disable*/
import Link from "next/link";
import type { FC } from "react";

import styles from "./Logo.module.scss";
import type LogoProps from "./LogoProps";

const Logo: FC<LogoProps> = ({ type, className }) => {
  return (
    <figure className={`${styles.container} ${className || ""}`}>
      <Link href="/">
        <img
          src={
            type === "white"
              ? "/assets/images/landing-page/Logo.png"
              : "/assets/images/landing-page/logo_black.png"
          }
          className={styles.image}
          alt={"Xcursions logo"}
          title={"Xcursions Logo"}
        />
      </Link>

      <script
        id="ze-snippet"
        src="https://static.zdassets.com/ekr/snippet.js?key=68010cd1-342c-49d1-a638-ff7412881950"
      >
        {" "}
      </script>
    </figure>
  );
};

export default Logo;
