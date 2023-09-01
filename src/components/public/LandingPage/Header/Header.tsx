import React from "react";

import Search from "../Search/Search";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header_wrapper}>
      <div className={`${styles.header}`}>
        <div className={styles.header_content__wrap}>
          <h1 className={styles.lead_header_txt}>A Better Way To Travel</h1>
          <p className={styles.lead_sub_txt}>
            Find your dream holiday destinations, get great hotel deals, and
            save for your next travel, all in one space.
          </p>
        </div>
        <Search />
      </div>
    </div>
  );
};

export default Header;
