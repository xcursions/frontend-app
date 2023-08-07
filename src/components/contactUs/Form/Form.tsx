"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiNavigation, FiPhoneCall } from "react-icons/fi";
import { TbMailbox } from "react-icons/tb";

import Button from "@/components/lib/Button";
import Input from "@/components/lib/Input";
import Text from "@/components/lib/Text/Text";
import TextArea from "@/components/lib/TextArea/TextArea";
import { useAppSelector, useErrorHandler, useSuccessHandler } from "@/hooks";
import { useCreateContactMutation } from "@/services/user";

const initialState = {
  name: "",
  email: "",
  message: "",
};

const Form = () => {
  const [payload, setPayload] = useState(initialState);
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const [createContact, { isSuccess, isError, error }] =
    useCreateContactMutation();

  useErrorHandler({ isError, error });
  useSuccessHandler({
    isSuccess,
    showToast: true,
    toastMessage: "Message sent successfully",
  });
  const handleSubmit = () => {
    createContact(payload);
  };
  return (
    <div className="w-full px-5 py-[58px]">
      <div className="relative mx-auto max-w-[1241px]">
        <div className="flex flex-col gap-[40px] lg:flex-row lg:gap-[80px]">
          <div className="max-h-[600px]">
            <Text className="font-dmSansBold text-[16px] font-bold text-[#101828] lg:text-[24px] ">
              Contact Details
            </Text>
            <div className="flex items-center gap-3 pt-3">
              <div className="rounded-full bg-[#EBF5FF] p-3">
                <FiPhoneCall className="text-[#0A83FF]" />
              </div>
              <Text className="text-[16px] text-[#000000] lg:text-[20px]">
                +234 8012914116 +234 7057051768
              </Text>
            </div>
            <div className="flex items-center gap-3 pt-3">
              <div className="rounded-full bg-[#EBF5FF] p-3">
                <TbMailbox className="text-[#0A83FF]" />
              </div>
              <Text className="text-[16px] text-[#000000] lg:text-[20px]">
                Info@excursion.com
              </Text>
            </div>
            <div className="flex items-center gap-3 pt-3">
              <div className="rounded-full bg-[#EBF5FF] p-3">
                <FiNavigation className="text-[#0A83FF]" />
              </div>
              <Text className="font-dmSansRegular text-[16px] font-normal text-[#000000] lg:text-[20px]">
                4517 Washington Ave. Manchester, Kentucky 39495
              </Text>
            </div>
            <Image
              src="/assets/images/contact/contact_man.png"
              alt="man"
              width={750}
              height={600}
              className="mt-[30px] max-h-[320px] w-[340px] rounded-md md:w-[608px]"
            />
          </div>
          <div className="max-h-[600px] w-full rounded-md border bg-[#FFFFFF] shadow-md lg:w-[491px]">
            <div className="m-[24px]  lg:m-[32px]">
              <Text className=" font-dmSansBold text-[16px] font-bold text-[#101828] lg:text-[24px] ">
                Send Us a Message
              </Text>
              <Input
                label="Name"
                value={payload.name}
                required
                placeholder="Enter your name here"
                className="w-full"
                onChange={(event) =>
                  // @ts-ignore
                  setPayload({ ...payload, name: event.target.value })
                }
              />
              <Input
                label="Email"
                value={payload.email}
                type="email"
                required
                placeholder="Enter your email here"
                className="w-full"
                onChange={(event) =>
                  // @ts-ignore
                  setPayload({ ...payload, email: event.target.value })
                }
              />
              <TextArea
                value={payload.message}
                label="Message"
                required
                placeholder="We would love to hear from you"
                className="h-[165px]"
                onChange={(event) =>
                  setPayload({ ...payload, message: event.target.value })
                }
              />
              {user && (
                <Button
                  className="mt-[32px] w-full rounded-3xl"
                  onClick={handleSubmit}
                >
                  Send Message
                </Button>
              )}
              {!user && (
                <Button
                  className="mt-[32px] w-full rounded-3xl"
                  onClick={() => router.push("/login")}
                >
                  Please login to message
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
