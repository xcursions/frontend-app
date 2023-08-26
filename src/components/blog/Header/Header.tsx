import Image from "next/image";
import React from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import Text from "@/components/lib/Text/Text";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header_wrapper}>
      <div className={`${styles.header}`}>
        <div className={styles.header_content__wrap}>
          <Heading type="h1" className={styles.lead_header_txt}>
            Resources & How our customers do
          </Heading>
          <Text className={styles.lead_sub_txt}>
            Vitae blandit elit eget porttitor malesuada dignissim porttitor.
            Nulla consectetur pretium sodales ullamcorper neque id condimentum.
            Amet vulputate facilisi eget convallis id adipiscing.
          </Text>
          <div className={styles.header_input__container}>
            <Input placeholder="search for topics" className={styles.input} />
            <Button className={styles.button}>Search</Button>
          </div>
        </div>
      </div>
      <div className={styles.featured_blog}>
        <Image
          width={800}
          height={415}
          src="/assets/images/blog/blog_header.png"
          alt="featured blog"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Header;
