import Image from "next/image";
import React from "react";

import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";

import styles from "./WhyChooseUs.module.scss";

const WhyChooseUs = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <Heading className={styles.heading}>Why Choose us</Heading>
        </div>
        <div className={styles.card_container}>
          <div className={styles.card}>
            <Image
              src="/assets/images/icons/luggage1.png"
              alt="luggage icon"
              width={60}
              height={60}
              className="m-auto"
            />
            <div className={styles.text_container}>
              <Heading type="h3" className={styles.card_heading}>
                Best Offers
              </Heading>
              <Text className={styles.card_text}>
                Inform you about all best offers for all destination
              </Text>
            </div>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/images/icons/calendar.png"
              alt="luggage icon"
              width={60}
              height={60}
              className="m-auto"
            />
            <div className={styles.text_container}>
              <Heading type="h3" className={styles.card_heading}>
                Best Time
              </Heading>
              <Text className={styles.card_text}>
                Inform you about all best offers for all destination
              </Text>
            </div>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/images/icons/airplane.png"
              alt="luggage icon"
              width={60}
              height={60}
              className="m-auto"
            />
            <div className={styles.text_container}>
              <Heading type="h3" className={styles.card_heading}>
                Best Flight
              </Heading>
              <Text className={styles.card_text}>
                Inform you about all best offers for all destination
              </Text>
            </div>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/images/icons/location.png"
              alt="luggage icon"
              width={60}
              height={60}
              className="m-auto"
            />
            <div className={styles.text_container}>
              <Heading type="h3" className={styles.card_heading}>
                Best Locations
              </Heading>
              <Text className={styles.card_text}>
                Inform you about all best offers for all destination
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
