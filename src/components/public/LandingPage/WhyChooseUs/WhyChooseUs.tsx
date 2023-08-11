import Image from "next/image";
import React from "react";

import Button from "@/components/lib/Button/Button";
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
      <div className=" bg-[#F9FAFB] py-5">
        <div className="mx-auto max-w-[1440px]">
          <div className="content-center justify-center pb-10 pt-[98px]">
            <Text className="items-center justify-center text-center font-dmSansRegular text-[12px] text-[#0A83FF]">
              OUR TRIPS
            </Text>
            <Text className="items-center justify-center text-center font-dmSansBold text-[24px] text-[#101828] lg:text-[36px]">
              Top Destinations
            </Text>
          </div>
          <div className={styles.card_container}>
            <div className={styles.card_image}>
              <img
                className={styles.pics}
                src="/assets/images/landing-page/santorini.png"
                alt="santorini greece"
              />
              <div className={styles.imagetextbody}>
                <div>
                  <Text className={styles.imageheading}>Santorini, Greece</Text>
                  <Text className={styles.imagetext}>Indonesia</Text>
                </div>
                <Button className="mx-2 rounded-2xl bg-white text-[#0A83FF]">
                  See Offer
                </Button>
              </div>
            </div>
            <div className={styles.card_image}>
              <img
                className={styles.pics}
                src="/assets/images/landing-page/bali_waterfall.png"
                alt="Bali Indonesia"
              />
              <div className={styles.imagetextbody}>
                <div>
                  <Text className={styles.imageheading}>Bali, Indonesia</Text>
                  <Text className={styles.imagetext}>Indonesia</Text>
                </div>
                <Button className="mx-2 rounded-2xl bg-white text-[#0A83FF]">
                  See Offer
                </Button>
              </div>
            </div>
            <div className={styles.card_image}>
              <img
                className={styles.pics}
                src="/assets/images/landing-page/bali_river.png"
                alt="Bali Indonesia"
              />
              <div className={styles.imagetextbody}>
                <div>
                  <Text className={styles.imageheading}>Bali, Indonesia</Text>
                  <Text className={styles.imagetext}>Indonesia</Text>
                </div>
                <Button className="mx-2 rounded-2xl bg-white text-[#0A83FF]">
                  See Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
