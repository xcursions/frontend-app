import Image from "next/image";
import React from "react";

import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header_wrapper}>
      <div className={`${styles.header}`}>
        <Image
          src={"/assets/images/event/events.png"}
          alt="image of vacation"
          width={1500}
          height={1000}
          className=" h-[273px] w-screen md:h-[410px] lg:h-[500px]"
        />
        <div className={styles.textContainer}>
          <Heading
            type="h2"
            className="text-center text-[35px] text-white lg:text-[56px]"
          >
            Events
          </Heading>
          <Text className="mx-auto max-w-[500px] text-center text-white">
            From festivals to live shows, our carefully curated events are
            designed to deliver unforgettable experiences
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Header;
