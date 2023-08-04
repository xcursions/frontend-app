import React from "react";

import Button from "@/components/lib/Button";
import Input from "@/components/lib/Input/Input";
import Text from "@/components/lib/Text/Text";

import styles from "./Subscription.module.scss";

const Subscription = () => {
  return (
    <div className={styles.wrapper}>
      <div className="overflow-none mx-auto max-w-4xl rounded-3xl bg-[#ffffff] p-6 shadow-2xl">
        <div className="flex max-h-[334px] gap-10">
          <img
            src="/assets/images/landing-page/hangout2.png"
            alt=""
            className="hidden max-h-[270px] rounded-2xl lg:block"
          />
          <div className="max-w-[550px] justify-center">
            <Text className="text-center font-dmSansBold text-[16px] font-bold md:text-start lg:text-[28px]">
              Subscribe to hear from us
            </Text>
            <Text className="py-3 text-[16px] text-[#475467]">
              Elementum porttitor diam pulvinar rutrum sed feugiat et nisl amet.
              Etiam non lo
            </Text>
            <div className="flex flex-col gap-3 py-5 lg:flex-row">
              <Input
                placeholder="Your Email address here"
                className="max-w-[500px] lg:w-[370px]"
              />
              <Button className="rounded-3xl bg-[#0A83FF]">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
