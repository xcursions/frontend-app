import Image from "next/image";
import React from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";

const Main = () => {
  return (
    <div className="w-full px-5 py-[58px]">
      <div className="relative mx-auto max-w-[1241px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:px-[59px]">
          <div className="">
            <Text className="max-w-[410px] font-dmSansBold text-[24px] font-bold text-[#101828] lg:text-[36px]">
              The{" "}
              <span className="rounded text-[#0A83FF] shadow-md">
                Xcursions
              </span>{" "}
              Story
            </Text>
          </div>
          <div>
            <Text className="my-5 text-justify text-[16px] font-normal text-[#667084]">
              Xcursions was born from a shared love for adventure, culture, and
              the profound impact travel can have on individuals and
              communities. At Xcursions, we&lsquo;re more than just a travel and
              tour company; we&lsquo;re your dedicated companion on the journey
              of a lifetime. As passionate travelers ourselves, we understand
              the thrill of exploring new horizons, the joy of discovering new
              cities, and the importance of creating memories that last a
              lifetime. Our mission is simple: to provide you with exceptional
              travel experiences that inspire and enrich your life.
            </Text>
            <Heading type="h3" className="my-3 text-[24px] text-[#101828]">
              What We Believe In
            </Heading>
            <Text className="my-3 text-justify text-[16px] font-normal text-[#667084]">
              <span className="font-dmSansBold  text-[#101828]">
                Experiences Over Destinations:
              </span>{" "}
              We believe that the true beauty of travel lies in the experiences
              it offers. We curate journeys that immerse you in the local
              culture, history, and beauty of each destination.
            </Text>
            <Text className="my-3 text-justify text-[16px] font-normal text-[#667084]">
              <span className="font-dmSansBold text-[#101828]">
                Sustainability and Responsibility:
              </span>{" "}
              As travelers, we understand our responsibility to protect the
              planet and support the communities we visit. We are committed to
              sustainable and ethical tourism practices that leave a positive
              impact on the places we explore.
            </Text>
            <Text className="my-3 text-justify text-[16px] font-normal text-[#667084]">
              <span className="font-dmSansBold text-[#101828]">
                Personalization:
              </span>{" "}
              Your journey should reflect your unique interests and desires.
              That&apos;s why we tailor every trip to your preferences, ensuring
              that you get the most out of your adventure.
            </Text>
            <Text className="my-3 text-justify text-[16px] font-normal text-[#667084]">
              <span className="font-dmSansBold text-[#101828]">
                Excellence in Service:
              </span>{" "}
              We take pride in providing exceptional customer service. From the
              moment you inquire about a trip to the day you return home,
              we&apos;re here to assist you every step of the way.
            </Text>
            <div className="mt-[32px] flex gap-3">
              <Image
                src={"/assets/images/about/about_1.png"}
                alt="about us at xcursions"
                width={500}
                height={500}
                className="w-[157px] lg:w-[287px]"
              />
              <Image
                src={"/assets/images/about/about_2.png"}
                alt="about us at xcursions"
                width={500}
                height={500}
                className="w-[157px] lg:w-[287px]"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mx-auto mt-[59px] max-w-[1014px] rounded-xl border p-5 shadow-md lg:mt-[100px] lg:p-[40px]">
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
              <div>
                <Text className="text-[24px] font-bold">
                  You have something unique
                </Text>
                <Text className="max-w-[610px] text-[14px] text-[#667084]">
                  Suspendisse enim elit consequat volutpat. Lectus vitae eget
                  aliquet egestas dis. Sem nunc at enim dui in felis in vel. Ut
                  purus gravida mattis sit mi donec.
                </Text>
              </div>
              <Button className="w-full rounded-3xl md:w-auto">Join Us</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
