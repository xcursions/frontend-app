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
        <div className="flex flex-wrap gap-[12px]">
          <a
            href="#"
            className="flex  items-center rounded-lg bg-white shadow lg:max-w-[48%] lg:flex-row"
          >
            <div className="flex flex-col justify-between p-4 leading-normal">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px]"
              />
              <Text className="mb-2 text-sm font-bold tracking-tight text-[#344054] ">
                &ldquo;Booking with XYZ Travel Company was the best decision I
                made for my vacation. Excellent customer service, seamless
                arrangements, and unforgettable experiences. Highly
                recommend!&ldquo;
              </Text>
              <Text className="mb-3 text-[18px] font-normal text-[#101828]">
                John Doe - Entreprenur
              </Text>
            </div>
            <img
              className="hidden h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg lg:block"
              src="/assets/images/landing-page/testimonials1.png"
              alt=""
            />
          </a>
          <a
            href="#"
            className="flex  items-center rounded-lg bg-white shadow lg:max-w-[48%] lg:flex-row"
          >
            <img
              className="hidden h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg lg:block"
              src="/assets/images/landing-page/testimonials2.png"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px]"
              />
              <Text className="mb-2 text-sm font-bold tracking-tight text-[#344054] ">
                &ldquo;Booking with XYZ Travel Company was the best decision I
                made for my vacation. Excellent customer service, seamless
                arrangements, and unforgettable experiences. Highly
                recommend!&ldquo;
              </Text>
              <Text className="mb-3 text-[18px] font-normal text-[#101828]">
                John Doe - Entreprenur
              </Text>
            </div>
          </a>
          <a
            href="#"
            className="flex  items-center rounded-lg bg-white shadow lg:max-w-[48%] lg:flex-row"
          >
            <img
              className="hidden h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg lg:block"
              src="/assets/images/landing-page/testimonials3.png"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px]"
              />
              <Text className="mb-2 text-sm font-bold tracking-tight text-[#344054] ">
                &ldquo;Booking with XYZ Travel Company was the best decision I
                made for my vacation. Excellent customer service, seamless
                arrangements, and unforgettable experiences. Highly
                recommend!&ldquo;
              </Text>
              <Text className="mb-3 text-[18px] font-normal text-[#101828]">
                John Doe - Entreprenur
              </Text>
            </div>
          </a>
          <a
            href="#"
            className="flex  items-center rounded-lg bg-white shadow lg:max-w-[48%] lg:flex-row"
          >
            <div className="flex flex-col justify-between p-4 leading-normal">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px]"
              />
              <Text className="mb-2 text-sm font-bold tracking-tight text-[#344054] ">
                &ldquo;Booking with XYZ Travel Company was the best decision I
                for my vacation. Excellent customer service, seamless
                arrangements, and unforgettable experiences. Highly
                recommend!&ldquo;
              </Text>
              <Text className="mb-3 text-[18px] font-normal text-[#101828]">
                John Doe - Entreprenur
              </Text>
            </div>
            <img
              className="hidden max-h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg lg:block"
              src="/assets/images/landing-page/testimonials1.png"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonies;
