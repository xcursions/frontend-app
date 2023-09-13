import React from "react";

import Text from "@/components/lib/Text/Text";

import styles from "./Testimonies.module.scss";

const Testimonies = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Text className="items-start text-start font-dmSansRegular text-[12px] text-[#0A83FF]">
          TESTIMONIALS
        </Text>
        <div className="flex max-w-[1238px] justify-between pb-5">
          <Text className=" max-w-[410px] items-start text-start font-dmSansBold text-[24px] leading-tight text-[#101828] lg:text-[40px]">
            What Our Customers are saying
          </Text>
        </div>
        <div className="flex flex-wrap gap-[12px] text-justify">
          <a
            href="#"
            className="flex max-h-[265px] w-full items-center rounded-lg bg-white shadow lg:relative lg:max-w-[48%] lg:flex-row"
          >
            <div className="flex flex-col justify-between p-4 leading-normal lg:w-[70%]">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px] lg:absolute lg:top-3"
              />
              <Text className="mb-2 text-[14px] font-bold tracking-tight text-[#344054] md:text-[18px] ">
                Lebanon was absolutely amazing, i enjoyed my stay. Thank you
                Xcursions
              </Text>
              <Text className=" text-[18px] font-normal text-[#101828] lg:absolute lg:bottom-3">
                Blessing
              </Text>
            </div>
            <img
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
              src="/assets/images/landing-page/testimonial1.jpeg"
              alt=""
            />
          </a>
          <a
            href="#"
            className="flex  max-h-[265px] items-center  rounded-lg bg-white shadow lg:relative lg:max-w-[48%] lg:flex-row"
          >
            <img
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
              src="/assets/images/landing-page/testimonial2.jpeg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal lg:w-[70%]">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px] lg:absolute lg:top-3"
              />
              <Text className="mb-2 text-[14px] font-bold tracking-tight text-[#344054] md:text-[18px] ">
                Obudu was a sight to behold, and I loved the merch (bag, bottle
                and socks). Also loved the fact that refreshments were available
                during the trip. It was an amazing trip generally.
              </Text>
              <Text className="text-[18px] font-normal text-[#101828] lg:absolute lg:bottom-3">
                Gift
              </Text>
            </div>
          </a>
          <a
            href="#"
            className="flex  max-h-[265px] items-center  rounded-lg bg-white shadow lg:relative lg:max-w-[48%] lg:flex-row"
          >
            <img
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
              src="/assets/images/landing-page/testimonial3.jpeg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal lg:w-[70%]">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px] lg:absolute lg:top-3"
              />
              <Text className="mb-2 text-[14px] font-bold tracking-tight text-[#344054] md:text-[18px] ">
                Thank you Xcursions. I just touch down Abuja. I appreciate you
                all for the wonderful experience in Kenya. So happy to have met
                everyone i met on the trip. Gracias guys! The time was worth
                it💪🏾💪🏾💪🏾
              </Text>
              <Text className="text-[18px] font-normal text-[#101828] lg:absolute lg:bottom-3">
                Samson
              </Text>
            </div>
          </a>
          <a
            href="#"
            className="flex max-h-[265px]  items-center rounded-lg bg-white shadow lg:relative lg:max-w-[48%] lg:flex-row"
          >
            <div className="flex flex-col justify-between p-4 leading-normal lg:w-[70%]">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px] lg:absolute lg:top-3"
              />
              <Text className="mb-2 text-[14px] font-bold tracking-tight text-[#344054] md:text-[18px] ">
                Hey Xcursions, I wanted to take a moment to say a huge thank you
                for the incredible service and unforgettable experience. You
                guys went above and beyond to make my trip absolutely amazing. I
                can&apos;t wait to book another adventure with you in the
                future! 🌟😊
              </Text>
              <Text className="text-[18px] font-normal text-[#101828] lg:absolute lg:bottom-3">
                Collins
              </Text>
            </div>
            <img
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
              src="/assets/images/landing-page/testimonial4.jpeg"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonies;
