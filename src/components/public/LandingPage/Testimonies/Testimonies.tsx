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
            className="flex  max-h-[265px] items-center rounded-lg bg-white shadow lg:max-w-[48%] lg:flex-row"
          >
            <div className="flex flex-col justify-between p-4 leading-normal lg:w-[70%]">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px]"
              />
              <Text className="mb-2 text-[14px] font-bold tracking-tight text-[#344054] md:text-[18px] ">
                Hey Xcursions, I wanted to take a moment to say a huge thank you
                for the incredible service and unforgettable experience. You
                guys went above and beyond to make my trip absolutely amazing. I
                can&apos;t wait to book another adventure with you in the
                future! 🌟😊
              </Text>
              <Text className="mb-3 text-[18px] font-normal text-[#101828]">
                Anonymous
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
            className="flex  max-h-[265px] items-center rounded-lg bg-white shadow lg:max-w-[48%] lg:flex-row"
          >
            <img
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
              src="/assets/images/landing-page/testimonials2.png"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal lg:w-[70%]">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px]"
              />
              <Text className="mb-2 text-[14px] font-bold tracking-tight text-[#344054] md:text-[18px] ">
                Thank you Xcursions. I just touch down Abuja. I appreciate you
                all for the wonderful experience in Kenya. So happy to have met
                everyone i met on the trip. Gracias guys! The time was worth
                it💪🏾💪🏾💪🏾
              </Text>
              <Text className="mb-3 text-[18px] font-normal text-[#101828]">
                John Doe - Entreprenur
              </Text>
            </div>
          </a>
          <a
            href="#"
            className="flex  max-h-[265px] items-center rounded-lg bg-white shadow lg:max-w-[48%] lg:flex-row"
          >
            <img
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
              src="/assets/images/landing-page/testimonials3.png"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal lg:w-[70%]">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px]"
              />
              <Text className="mb-2 text-[14px] font-bold tracking-tight text-[#344054] md:text-[18px] ">
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
            className="flex  max-h-[265px] items-center rounded-lg bg-white shadow lg:max-w-[48%] lg:flex-row"
          >
            <div className="flex flex-col justify-between p-4 leading-normal lg:w-[70%]">
              <img
                src="/assets/images/landing-page/vector.png"
                alt=""
                className="max-w-[20px]"
              />
              <Text className="mb-2 text-[14px] font-bold tracking-tight text-[#344054] md:text-[18px] ">
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
              className="hidden h-[265px] w-[30%] rounded-lg lg:block"
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
