"use client";

import Image from "next/image";
import React, { useState } from "react";

import Button from "@/components/lib/Button";
import { SubscriptionImage } from "@/components/lib/Cloudinary/Cloudinary";
import Input from "@/components/lib/Input/Input";
import Text from "@/components/lib/Text/Text";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import { useNewsletterSubscriptionMutation } from "@/services/user";

import styles from "./Subscription.module.scss";

const initialState = {
  email: "",
};
const Subscription = () => {
  const [payload, setPayload] = useState(initialState);
  const [createNewsletter, { isSuccess, isError, error }] =
    useNewsletterSubscriptionMutation();
  useSuccessHandler({
    isSuccess,
    toastMessage: "Success",
  });
  useErrorHandler({
    isError,
    error,
  });
  const handleSubmit = () => {
    createNewsletter(payload);
  };
  return (
    <div className={styles.wrapper}>
      <div className="overflow-none mx-auto max-w-[1016px] rounded-3xl bg-[#ffffff] p-6">
        <div className="flex max-h-[334px] gap-10">
          <Image
            src={SubscriptionImage.url}
            alt={SubscriptionImage.alt}
            width={350}
            height={270}
            className="hidden max-h-[270px] w-[350px] rounded-2xl lg:block"
          />
          <div className="max-w-[550px] justify-center">
            <Text className="text-center font-dmSansBold text-[16px] font-bold md:text-start lg:text-[28px]">
              Subscribe to Our Newsletter
            </Text>
            <Text className="py-3 text-[16px] text-[#475467]">
              Join our community of Co-travelers and be the first to hear about
              upcoming tours, latest travel gist, and travel opportunities
            </Text>
            <div className="flex flex-col items-center gap-3 py-5 lg:flex-row">
              <Input
                placeholder="Your email address here"
                type="email"
                className="h-[46px] lg:w-[352px]"
                value={payload.email}
                onChange={(event) =>
                  setPayload({
                    ...payload,
                    // @ts-ignore
                    email: event?.target.value,
                  })
                }
              />
              <Button
                className="h-[46px] w-full rounded-[100px] bg-[#0A83FF]"
                onClick={handleSubmit}
              >
                Subscribe for free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
