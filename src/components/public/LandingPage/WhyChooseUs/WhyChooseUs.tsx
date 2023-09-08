"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";
import { useGetAllOutingsQuery } from "@/services/public";

import styles from "./WhyChooseUs.module.scss";

const WhyChooseUs = () => {
  const { data, isSuccess } = useGetAllOutingsQuery("?type=tour");
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <Heading className={styles.heading}>Why Choose Us</Heading>
        </div>
        <div className={styles.card_container}>
          <div className={styles.card}>
            <Image
              src="/assets/images/icons/luggage1.png"
              alt="luggage icon"
              width={100}
              height={100}
              className="m-auto h-[72px] w-[72px] lg:h-[100px] lg:w-[100px]"
            />
            <div className={styles.text_container}>
              <Heading type="h3" className={styles.card_heading}>
                Save & Travel On The Go
              </Heading>
              <Text className={styles.card_text}>
                Automate your savings & reach your travel goals faster with our
                “pay small small“ plan. No Charges. No Penalties. Absolutely
                Free
              </Text>
            </div>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/images/icons/calendar.png"
              alt="luggage icon"
              width={100}
              height={100}
              className="m-auto h-[72px] w-[72px] lg:h-[100px] lg:w-[100px]"
            />
            <div className={styles.text_container}>
              <Heading type="h3" className={styles.card_heading}>
                Access Vacation Options in One Click
              </Heading>
              <Text className={styles.card_text}>
                With our wide range of budget-friendly vacation deals, you will
                be exploring the world without breaking the bank. No stress.
                Just maximum enjoyment!
              </Text>
            </div>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/images/icons/airplane.png"
              alt="luggage icon"
              width={100}
              height={100}
              className="m-auto h-[72px] w-[72px] lg:h-[100px] lg:w-[100px]"
            />
            <div className={styles.text_container}>
              <Heading type="h3" className={styles.card_heading}>
                Book Hotels Across the Globe
              </Heading>
              <Text className={styles.card_text}>
                Hotel booking hassles are old news here. From hotels to short
                lets, to apartments for all your vacations. We&apos;ve got you
                covered!
              </Text>
            </div>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/images/icons/location.png"
              alt="luggage icon"
              width={100}
              height={100}
              className="m-auto h-[72px] w-[72px] lg:h-[100px] lg:w-[100px]"
            />
            <div className={styles.text_container}>
              <Heading type="h3" className={styles.card_heading}>
                Best Locations
              </Heading>
              <Text className={styles.card_text}>
                Hotel booking hassles are old news here. From hotels to short
                lets, to apartments for all your vacations. We&apos;ve got you
                covered!
              </Text>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-[40px]">
          <Link href="/signup">
            <Button className="rounded-3xl">Get Started Now</Button>
          </Link>
        </div>
      </div>
      <div className=" bg-[#F9FAFB] py-5">
        <div className="mx-auto max-w-[1440px]">
          {isSuccess &&
            data?.result.filter(
              (res: { showInLandingPage: any }) => res.showInLandingPage
            ).length > 0 && (
              <div className="content-center justify-center pb-10 pt-[78px]">
                <Text className="items-center justify-center text-center font-dmSansRegular text-[12px] text-[#0A83FF]">
                  OUR TRIPS
                </Text>
                <Text className="items-center justify-center text-center font-dmSansBold text-[24px] text-[#101828] lg:text-[36px]">
                  Top Destinations
                </Text>
              </div>
            )}
          <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-3 lg:gap-[12px]">
            {isSuccess &&
              data?.result
                .filter(
                  (res: { showInLandingPage: any }) => res.showInLandingPage
                )
                .slice(0, 3)
                .map((post: any) => (
                  <Link key={`${post.id}`} href={`/trips/${post.id}`}>
                    <div className={styles.card_image}>
                      <img
                        className={styles.pics}
                        src={post.outingGallery?.[0]?.image}
                        alt={post.name}
                      />
                      <div className={styles.imagetextbody}>
                        <div>
                          <Text className={styles.imageheading}>
                            {post.name}
                          </Text>
                          <Text className={styles.imagetext}>
                            {post.outingDestination.city}
                          </Text>
                        </div>
                        <Button className="mx-2 rounded-2xl bg-white text-[#0A83FF]">
                          See Offer
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
