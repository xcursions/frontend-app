"use client";

import React from "react";

import Search from "../Search/Search";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header_wrapper}>
      <div className={`${styles.header}`}>
        <div className={styles.header_content__wrap}>
          <h2 className={styles.lead_header_txt}>
            Travel, enjoy and live a new and full life
          </h2>
          <p className={styles.lead_sub_txt}>
            Built Wicket longer admire do barton vanity itself do in it.
            Preferred to sportsmen it engrossed listening. Park gate sell they
            west hard for the.
          </p>
        </div>
        <Search />
      </div>
    </div>
  );
};

export default Header;
