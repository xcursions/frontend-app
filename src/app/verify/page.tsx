"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import Button from "@/components/lib/Button";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";
import { useAppDispatch, useErrorHandler, useSuccessHandler } from "@/hooks";
import { useVerifyOTPMutation } from "@/services/auth";
import { setUserData, setUserToken } from "@/store/slices/userSlice";
import { validateOTPInputs } from "@/utils/validators";
import { isEmpty } from "@/utils/validators/helpers";

const initialState = {
  userId: "",
  otpId: "",
  otpCode: "",
};
const Verify = () => {
  const [payload, setPayload] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [verifyOTP, { isLoading, data, isError, error, isSuccess }] =
    useVerifyOTPMutation();
  useErrorHandler({ isError, error });
  useSuccessHandler({
    isSuccess,
    successFunction: () => {
      dispatch(setUserData(data?.data));
      dispatch(setUserToken(data.token));
      router.push("/verify");
    },
    toastMessage: "Account verified successfully!",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };
  // @ts-ignore
  const OTPInput = dynamic(() => import("otp-input-react"), {
    ssr: false,
  });

  const handleSubmit = () => {
    setErrors(initialState);

    const { valid, errors: validationErrors } = validateOTPInputs(payload);

    if (valid) {
      verifyOTP(payload);
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div className="w-full  overflow-hidden bg-[#FFFFFF]">
      <div className="flex">
        <div className="relative h-screen w-[40%] bg-[url('/assets/images/verify.png')]">
          <img src="/assets/images/verify.png" alt="login image" />
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
        <div className="m-auto content-center items-center justify-center">
          <div className="m-auto items-center justify-center">
            <Heading type="h1" className="m-auto font-dmSansBold text-[24px]">
              Verify your account
            </Heading>
            <Text className="text-center text-[14px] text-[#667084]">
              A verification code has been sent to your email
            </Text>
            <div className="gap-4">
              <OTPInput
                // @ts-ignore
                value={payload.otpCode}
                onChange={handleChange}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
                inputClassName={`m-0 flex-1 rounded-md
                border border-transparent border-gray-300 bg-transparent bg-gray-100
               font-proximaNovaRegular text-sm 
              text-gray-600 focus:text-gray-900 focus:outline-none;
            `}
                className={`flex items-center gap-2`}
                inputStyles={{ marginRight: 0, height: 40, width: 40 }}
              />
              {!isEmpty(errors.otpCode) && (
                <span className="text-xxs leading-none text-red-500">
                  {errors.otpCode}
                </span>
              )}
            </div>
            <Button
              className="mt-3 w-full !py-3"
              loading={isLoading}
              disabled={payload.otpCode.length !== 6}
              onClick={handleSubmit}
            >
              AUTHENTICATE
            </Button>

            <Text className="my-3 text-[14px] text-[#667084]">
              Dont have an account yet.
              <Link href="/auth/signin">
                <span className="text-[#0A83FF]">Create account</span>
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
