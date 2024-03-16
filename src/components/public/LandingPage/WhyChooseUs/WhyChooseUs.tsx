"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import Button from "@/components/lib/Button";

const WhyChooseUs = () => {
  return (
    <section className="xcursion_wcs">
      <div className="xcursion_wcs_wrapper">
        <div>
          <h3 className="header">Why Choose Us</h3>
          <p className="paragraph">The best place you could spend the summer</p>
        </div>

        <div className="xcursion_wcs_card_container">
          <div className="xcursion_wcs_card_container_card">
            <Image
              src="/assets/images/icons/cash.png"
              alt="luggage icon"
              width={70}
              height={75}
              className="h-[75px] w-[70px]"
            />
            <div className=" txt">
              <h4>Save & Travel On The Go</h4>
              <p>
                Automate your savings & reach your travel goals faster with our
                “pay small small“ plan. Join us today,
              </p>
            </div>
            <Button className="rounded-[1000px]">Get Started</Button>
          </div>
          <div className="xcursion_wcs_card_container_card">
            <Image
              src="/assets/images/icons/location.png"
              alt="luggage icon"
              width={70}
              height={75}
              className="h-[75px] w-[70px]"
            />
            <div className=" txt">
              <h4>Experience new places across the world</h4>
              <p>
                Explore new worlds and uncover the extraordinary. Adventure
                awaits with every destination you discover.
              </p>
            </div>
            <Link href={"/trips"}>
              <Button className="rounded-[1000px]">View Trips</Button>
            </Link>
          </div>
          <div className="xcursion_wcs_card_container_card">
            <Image
              src="/assets/images/icons/passport.png"
              alt="luggage icon"
              width={70}
              height={75}
              className="h-[75px] w-[70px]"
            />
            <div className="txt">
              <h4>Visa Application Guidance</h4>
              <p>
                Streamline your visa application process, ensure accuracy, and
                maximize your chances of approval with our professional
                guidance.
              </p>
            </div>
            <Button className="rounded-[1000px]">Start Application</Button>
          </div>
        </div>
      </div>
      {/* <div className=" bg-[#F9FAFB] py-5">
        <div className="mx-auto max-w-[1440px]">
          {isSuccess &&
            data?.result.filter(
              (res: { showInLandingPage: any }) => res.showInLandingPage
            ).length > 0 && (
              <div className="content-center justify-center pb-10 pt-[78px]">
                <Text className="items-center justify-center text-center font-dmSansBold text-[12px] font-bold text-[#0A83FF]">
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
                      <Image
                        className={styles.pics}
                        width={300}
                        height={292}
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
      </div> */}
    </section>
  );
};

export default WhyChooseUs;
