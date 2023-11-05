import Image from "next/image";
import React from "react";

import {
  Testimony1,
  Testimony2,
  Testimony3,
  Testimony4,
} from "@/components/lib/Cloudinary/Cloudinary";
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
              <p className="mb-2 font-dmSansRegular text-[14px] font-light tracking-tight text-[#344054] md:text-[16px] ">
                Lebanon was absolutely amazing, i enjoyed my stay. Thank you
                Xcursions
              </p>
              <Text className=" text-[18px] font-normal text-[#101828] lg:absolute lg:bottom-3">
                Blessing
              </Text>
            </div>
            <Image
              height={256}
              width={200}
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
              src={Testimony1.url}
              alt={Testimony1.alt}
              title={Testimony1.title}
            />
          </a>
          <a
            href="#"
            className="flex  max-h-[265px] items-center  rounded-lg bg-white shadow lg:relative lg:max-w-[48%] lg:flex-row"
          >
            <Image
              height={256}
              width={200}
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
              src={Testimony2.url}
              alt={Testimony2.alt}
              title={Testimony2.title}
            />
            <div className="flex flex-col justify-between p-4 leading-normal lg:w-[70%]">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px] lg:absolute lg:top-3"
              />
              <Text className="mb-2 font-dmSansRegular text-[14px] font-light tracking-tight text-[#344054] md:text-[16px] ">
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
            <Image
              height={256}
              width={200}
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
              src={Testimony3.url}
              alt={Testimony3.alt}
              title={Testimony3.title}
            />
            <div className="flex flex-col justify-between p-4 leading-normal lg:w-[70%]">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px] lg:absolute lg:top-3"
              />
              <Text className="mb-2 font-dmSansRegular text-[14px] font-light tracking-tight text-[#344054] md:text-[16px] ">
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
              <Text className="mb-2 font-dmSansRegular text-[14px] font-light tracking-tight text-[#344054] md:text-[16px] ">
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
            <Image
              height={256}
              width={200}
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
              src={Testimony4.url}
              alt={Testimony4.alt}
              title={Testimony4.title}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonies;
