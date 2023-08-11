import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";

import styles from "./TopDestinations.module.scss";

const TopDestinations = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.textcontainer}>
          <Heading
            className="max-w-[340px] font-dmSansMedium text-[36px] text-[#101828]"
            type="h3"
          >
            Book Your Next Trip In 3 Easy Steps
          </Heading>
          <div className="font-dmSansMedium">
            <div className="flex items-start gap-3">
              <p className="h-fit w-fit rounded-full bg-[#0A83FF] px-2 py-[2px] text-xs text-[#ffffff]">
                1
              </p>
              <div className="">
                <Text className="font-dmSansMedium text-[16px] text-[#101828]">
                  View Available Trips
                </Text>
                <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                  A tristique tincidunt quam eu vel. Sed lectus at mauris
                  aliquet pellentesque elementum dolor tincidunt in.
                </Text>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <p className="h-fit w-fit rounded-full bg-[#0A83FF] px-2 py-[3px] text-xs text-[#ffffff]">
                2
              </p>
              <div className="">
                <Text className="font-dmSansMedium text-[16px] text-[#101828]">
                  Select and View Details
                </Text>
                <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                  A tristique tincidunt quam eu vel. Sed lectus at mauris
                  aliquet pellentesque elementum dolor tincidunt in.
                </Text>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <p className="h-fit w-fit rounded-full bg-[#0A83FF] px-2 py-[3px] text-xs text-[#ffffff]">
                3
              </p>
              <div className="">
                <Text className="font-dmSansMedium text-[16px] text-[#101828]">
                  Make Payment
                </Text>
                <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                  A tristique tincidunt quam eu vel. Sed lectus at mauris
                  aliquet pellentesque elementum dolor tincidunt in.
                </Text>
              </div>
            </div>
          </div>
          <Button className="max-w-[174px] rounded-3xl bg-[#0A83FF] hover:bg-blue-400">
            Get Started Now
          </Button>
        </div>
        <div className={styles.imagecontainer}>
          <img
            src="/assets/images/landing-page/landscape.png"
            alt=""
            className=""
          />
        </div>
      </div>
      <div className="mx-auto max-w-[1240px]">
        <div className="content-center justify-center pb-10 pt-[98px]">
          <Text className="items-center justify-center text-center font-dmSansRegular text-[12px] text-[#0A83FF]">
            OUR TRIPS
          </Text>
          <Text className="items-center justify-center text-center font-dmSansBold text-[24px] text-[#101828] lg:text-[36px]">
            Top Events and Hangouts
          </Text>
        </div>
        <div className={styles.card_container}>
          <div className={styles.card_image}>
            <img
              className={styles.pics}
              src="/assets/images/landing-page/hangout1.png"
              alt="santorini greece"
            />
            <div className="absolute right-1 top-1 rounded-full bg-white p-2">
              <AiOutlineHeart className="text-xl" />
            </div>
            <div>
              <Text>Bali, Indonesia</Text>
              <Text className="text-[16px] text-[#0A83FF]">₦200,000</Text>
            </div>
          </div>
          <div className={styles.card_image}>
            <img
              className={styles.pics}
              src="/assets/images/landing-page/hangout2.png"
              alt="Bali Indonesia"
            />
            <div className="absolute right-1 top-1 rounded-full bg-white p-2">
              <AiOutlineHeart className="text-xl" />
            </div>
            <div>
              <Text>Bali, Indonesia</Text>
              <Text className="text-[16px] text-[#0A83FF]">₦200,000</Text>
            </div>
          </div>
          <div className={styles.card_image}>
            <img
              className={styles.pics}
              src="/assets/images/landing-page/hangout3.png"
              alt="Bali Indonesia"
            />
            <div className="absolute right-1 top-1 rounded-full bg-white p-2">
              <AiOutlineHeart className="text-xl" />
            </div>
            <div>
              <Text>Bali, Indonesia</Text>
              <Text className="text-[16px] text-[#0A83FF]">₦200,000</Text>
            </div>
          </div>
          <div className={styles.card_image}>
            <img
              className={styles.pics}
              src="/assets/images/landing-page/hangout4.png"
              alt="Bali Indonesia"
            />
            <div className="absolute right-1 top-1 rounded-full bg-white p-2">
              <AiOutlineHeart className="text-xl" />
            </div>
            <div>
              <Text>Bali, Indonesia</Text>
              <Text className="text-[16px] text-[#0A83FF]">₦200,000</Text>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery */}
      <div className="relative mx-auto grid max-w-[1240px] grid-cols-2 gap-4 md:grid-cols-4">
        <div className="absolute bottom-[45%] left-[40%]">
          <img
            src="/assets/images/gallery/text.png"
            alt=""
            className="hidden max-h-[136px] max-w-[270px] rounded-lg lg:block"
          />
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery1.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery2.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery3.png"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery4.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery5.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery6.png"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery7.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery8.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery9.png"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery10.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery11.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/assets/images/gallery/gallery12.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDestinations;
