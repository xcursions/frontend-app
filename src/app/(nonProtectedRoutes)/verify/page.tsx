"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Button from "@/components/lib/Button";
import Heading from "@/components/lib/Heading/Heading";
import OtpInput from "@/components/lib/OtpInput";
import Text from "@/components/lib/Text/Text";
import TopNavBar from "@/components/public/TopNavBar";
import {
  useAppDispatch,
  useAppSelector,
  useErrorHandler,
  useSuccessHandler,
} from "@/hooks";
import { useResendOTPMutation, useVerifyOTPMutation } from "@/services/auth";
import {
  selectedUserId,
  selectUserOtpId,
} from "@/store/selector/user.selector";
import {
  setUserAuthMethod,
  setUserData,
  setUserToken,
} from "@/store/slices/userSlice";
import { validateOTPInputs } from "@/utils/validators";
import { isEmpty } from "@/utils/validators/helpers";

const initialState = {
  userId: "",
  otpId: "",
  otpCode: "",
};
const initialResendState = {
  userId: "",
  otpId: "",
};
const Verify = () => {
  const [payload, setPayload] = useState(initialState);
  const [otpPayload, setOtpPayload] = useState(initialResendState);
  const [errors, setErrors] = useState(initialState);
  const router = useRouter();
  const userId = useAppSelector(selectedUserId);
  const userOtp = useAppSelector(selectUserOtpId);

  const dispatch = useAppDispatch();
  const [verifyOTP, { isLoading, data, isError, error, isSuccess }] =
    useVerifyOTPMutation();
  const [resendOtp, { isSuccess: isResendSuccess, data: ResendOtpData }] =
    useResendOTPMutation();
  useErrorHandler({ isError, error });
  useSuccessHandler({
    isSuccess,
    successFunction: () => {
      dispatch(setUserData(data?.data));
      dispatch(setUserToken(data?.meta?.token));
      dispatch(setUserAuthMethod("regular-auth"));
      router.push("/verify/success");
    },
    toastMessage: "Account verified successfully!",
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
  const handleResendOtp = () => {
    resendOtp(otpPayload);
  };
  useSuccessHandler({
    isSuccess: isResendSuccess,
    successFunction: () => {
      dispatch(setUserData(ResendOtpData?.data));
      dispatch(setUserToken(ResendOtpData?.meta?.token));
    },
    toastMessage: "Otp has been sent",
  });
  useEffect(() => {
    if (userId && userOtp) {
      setPayload((prevPayload) => ({
        ...prevPayload,
        // eslint-disable-next-line object-shorthand
        userId: userId,
        otpId: userOtp,
      }));
      setOtpPayload((prevPayload) => ({
        ...prevPayload,
        // eslint-disable-next-line object-shorthand
        userId: userId,
        otpId: userOtp,
      }));
    }
  }, []);
  useEffect(() => {
    if (isResendSuccess && ResendOtpData) {
      setPayload((prev) => ({
        ...prev,
        userId: ResendOtpData.data.userId,
        otpId: ResendOtpData.data.otpId,
      }));
      setOtpPayload((prev) => ({
        ...prev,
        userId: ResendOtpData.data.userId,
        otpId: ResendOtpData.data.otpId,
      }));
    }
  }, [isResendSuccess, ResendOtpData]);
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
            // width={498}
            // height={900}
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
          <div className="m-auto mt-8 items-center justify-center px-3 lg:mt-4">
            <Heading
              type="h1"
              className="m-auto text-center font-dmSansBold text-[24px]"
            >
              Verify your account
            </Heading>
            <Text className="mb-10 text-center text-[14px] text-[#667084]">
              A verification code has been sent to your email
            </Text>
            <div className="gap-4">
              <OtpInput
                value={payload.otpCode}
                valueLength={6}
                onChange={(value: string) =>
                  setPayload((prevPayload) => ({
                    ...prevPayload,
                    otpCode: value,
                  }))
                }
              />
              {!isEmpty(errors.otpCode) && (
                <span className="text-xxs leading-none text-red-500">
                  {errors.otpCode}
                </span>
              )}
            </div>
            <Text className=" py-5 text-[13px]">
              Didnt Receive a code.{" "}
              <button
                className="text-[#0A83FF] underline"
                onClick={handleResendOtp}
              >
                Resend Code
              </button>
            </Text>
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
              <Link href="/signup">
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
