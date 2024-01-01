"use client";

import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import { AiOutlineWhatsApp } from "react-icons/ai";
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
    toastMessage: "Message has been sent",
  });
  const handleSubmit = () => {
    createContact(payload);
  };
  const address =
    "No 13 LK ANGA, along Total Gospel Road, Peter Odili, Port Harcourt";
  const address2 =
    "His Glory Plaza, Suite 206 Ademola Adetokunbo Crescent Wuse 2 Abuja";

  const openMap = () => {
    window.open(
      `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      "_blank"
    );
  };
  const openMap2 = () => {
    window.open(
      `https://maps.google.com/?q=${encodeURIComponent(address2)}`,
      "_blank"
    );
  };
  return (
    <div className="w-full px-5 py-[58px]">
      <div className="relative mx-auto max-w-[1241px]">
        <div className="flex flex-col gap-[40px] lg:flex-row lg:gap-[80px]">
          <div className="max-h-[600px]">
            <Text className="font-dmSansBold text-[16px] font-bold text-[#101828] lg:text-[24px] ">
              Reach Our Team
            </Text>
            {/* <a
              href={`https://wa.me/+2348168277417`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-3 pt-3">
                <div className="rounded-full bg-[#EBF5FF] p-3">
                  <AiOutlineWhatsApp className="text-[#0A83FF]" />
                </div>
                <Text className="cursor-pointer text-[16px] text-[#000000] lg:text-[20px]">
                  Click here to reach us on Whatsapp
                </Text>
              </div>
            </a> */}
            <div className="flex items-center gap-3 pt-3">
              <div className="rounded-full bg-[#EBF5FF] p-3">
                <FiPhoneCall className="text-[#0A83FF]" />
              </div>
              <Text className="text-[16px] text-[#000000] lg:text-[20px]">
                <a href={`tel:+2348012914116`}>+2348012914116</a> or{" "}
                <a href={`tel:+2347057051768`}>+2347057051768</a>
              </Text>
            </div>
            <div className="flex items-center gap-3 pt-3">
              <div className="rounded-full bg-[#EBF5FF] p-3">
                <TbMailbox className="text-[#0A83FF]" />
              </div>
              <Text className="text-[16px] text-[#000000] lg:text-[20px]">
                <a href={`mailto:xcursionsng@gmail.com`}>
                  xcursionsng@gmail.com
                </a>
              </Text>
            </div>
            <div
              className="flex cursor-pointer items-center gap-3 pt-3"
              onClick={openMap}
            >
              <div className="rounded-full bg-[#EBF5FF] p-3">
                <FiNavigation className="text-[#0A83FF]" />
              </div>
              <Text className="font-dmSansRegular text-[16px] font-normal text-[#000000] lg:text-[20px]">
                No 13 LK ANGA, along Total Gospel Road, Peter Odili, Port
                Harcourt
              </Text>
            </div>
            <div
              className="flex cursor-pointer items-center gap-3 pt-3"
              onClick={openMap2}
            >
              <div className="rounded-full bg-[#EBF5FF] p-3">
                <FiNavigation className="text-[#0A83FF]" />
              </div>
              <Text className="font-dmSansRegular text-[16px] font-normal text-[#000000] lg:text-[20px]">
                His Glory Plaza, Suite 206 Ademola Adetokunbo Crescent Wuse 2
                Abuja
              </Text>
            </div>

            <Image
              src="/assets/images/contact/contact_header_mobile.png"
              alt="man"
              width={750}
              height={600}
              className="mt-[30px] max-h-[320px] w-[340px] rounded-md md:w-[608px]"
            />
          </div>
          <div className="max-h-[600px] w-full rounded-md border bg-[#FFFFFF] shadow-md lg:w-[491px]">
            <div className="m-[24px]  lg:m-[32px]">
              <Text className=" font-dmSansBold text-[14px] font-bold text-[#101828] lg:text-[20px] ">
                Need assistance?
                <br /> We’re Here to Help
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
