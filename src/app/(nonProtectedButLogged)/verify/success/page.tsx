import Image from "next/image";
import Link from "next/link";
import React from "react";

import Button from "@/components/lib/Button";
import Heading from "@/components/lib/Heading/Heading";
import { CheckIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text/Text";
import TopNavBar from "@/components/public/TopNavBar";

const Verify = () => {
  return (
    <div className="w-full  overflow-hidden bg-[#FFFFFF]">
      <div className="lg:hidden">
        <TopNavBar />
      </div>
      <div className="flex">
        <div className="relative hidden h-screen w-[500px] lg:block">
          <Image
            src="/assets/images/verify.png"
            alt="login image"
            layout="fill"
            className="h-full w-full object-cover"
          />
          <Link href="/" className="absolute top-0 z-20">
            <img
              src="/assets/images/landing-page/Logo.png"
              alt="login image"
              className=" w-auto max-w-[200px] pl-[40px] pt-[40px] hover:cursor-pointer"
            />
          </Link>
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute bottom-5 pb-[40px] pl-[40px] text-[#FFFFFF]">
            <Text className="font-dmSansMedium text-[30px]">
              ⚡️ <br />
              Ready for a Break?
            </Text>
            <Text className="max-w-[419px] font-dmSansRegular text-[14px]">
              Book your dream vacation today with our exclusive travel deals.
              Unbeatable prices, top-notch service.
            </Text>
          </div>
        </div>
        <div className="m-auto mt-24 content-center items-center justify-center lg:mt-auto">
          <div className="m-auto mt-8  max-w-[403px] items-center justify-center px-3 lg:mt-4">
            <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#12B76A] md:h-[64px] md:w-[64px]">
              <CheckIcon />
            </div>

            <Heading
              type="h1"
              className="m-auto text-center font-dmSansBold text-[18px] leading-[160%]"
            >
              Account Created
            </Heading>
            <Text className="text-center text-[14px] leading-[160%] text-[#667084]">
              Account created successfully! Login with your email and password.
              Keep your login details secure. Thank you for choosing us!
            </Text>
            <Link href="/user/dashboard">
              <Button className="my-[16px] w-full rounded-[100px] font-dmSansRegular text-[16px] font-normal">
                Proceed to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
