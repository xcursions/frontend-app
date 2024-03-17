"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
// import OtpInput from "@/components/lib/OtpInput/OtpInput";
import Text from "@/components/lib/Text/Text";
import Navbar from "@/components/public/Navbar";
import { useAppSelector, useErrorHandler, useSuccessHandler } from "@/hooks";
import { useVerifyForgotPasswordMutation } from "@/services/auth";
import {
  selectedUserId,
  selectUserOtpCode,
  selectUserOtpId,
} from "@/store/selector/user.selector";
import { validateVerifyForgotPasswordInputs } from "@/utils/validators";
import { isEmpty } from "@/utils/validators/helpers";

const initialState = {
  userId: "",
  otpId: "",
  otpCode: "",
  newPassword: "",
  confirmPassword: "",
};
const ForgotPassword = () => {
  const userId = useAppSelector(selectedUserId);
  const userOtp = useAppSelector(selectUserOtpId);
  const otpCode = useAppSelector(selectUserOtpCode);
  const [payload, setPayload] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const [login, { isLoading, isError, isSuccess, error }] =
    useVerifyForgotPasswordMutation();
  useErrorHandler({ isError, error });
  useSuccessHandler({
    isSuccess,
    showToast: true,
    // successFunction: () => {
    //   router.push("/login");
    //   return null;
    // },
    toastMessage: "Success",
  });
  const handleSubmit = () => {
    setErrors(initialState);

    const { valid, errors: validationErrors } =
      validateVerifyForgotPasswordInputs(payload);

    if (valid) {
      login(payload);
    } else {
      setErrors(validationErrors);
    }
  };
  useEffect(() => {
    if (userId && userOtp && otpCode) {
      setPayload((prevPayload) => ({
        ...prevPayload,
        // eslint-disable-next-line object-shorthand
        userId: userId,
        otpId: userOtp,
        otpCode,
      }));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };
  return (
    <div className="w-full  overflow-hidden bg-[#FFFFFF]">
      <div className="flex">
        <div className="relative hidden h-screen w-[500px] lg:block">
          <Image
            src="/assets/images/forgot_password.png"
            alt="login image"
            layout="fill"
            className="h-full w-full object-cover"
          />
          <Link href="/" className="absolute top-0 z-20 hidden lg:block">
            <img
              src="/assets/images/landing-page/Logo.png"
              alt="login image"
              className=" w-auto max-w-[200px] pl-[40px] pt-[40px] hover:cursor-pointer"
            />
          </Link>
          <div className="absolute inset-0 hidden bg-black opacity-10 lg:block"></div>
          <div className="absolute bottom-5 hidden pb-[40px] pl-[40px] text-[#FFFFFF] lg:block">
            <Text className="font-dmSansMedium text-[30px]">
              🏝️ <br />
              Discover Iconic Destinations
            </Text>
            <Text className="max-w-[419px] font-dmSansRegular text-[14px]">
              Breathtaking beaches of Bali to Europe&lsquo;s landmarks. Expertly
              crafted itineraries, unbeatable prices.
            </Text>
          </div>
        </div>
        <div className="lg:hidden">
          <Navbar text="black" logo="black" />
        </div>
        <div className="m-auto mt-16 content-center items-center justify-center lg:mt-auto">
          <div className="m-auto mt-8 items-center justify-center px-3 lg:mt-4">
            <img
              src="/assets/images/PASSPORT.png"
              alt="login image"
              className="mx-auto h-[120px] w-[90px] items-center pb-3"
            />
            {isSuccess ? (
              <div className="flex w-[342px] flex-col gap-4 md:w-[402px]">
                <Heading
                  type="h1"
                  className="m-auto text-center font-dmSansBold text-[24px]"
                >
                  Reset Password Sucessfully
                </Heading>
                <Text className="text-center text-[14px] text-[#667084]">
                  Account created successfully! Login with your email and
                  password. Keep your login details secure. Thank you for
                  choosing us!
                </Text>
                <Link href="/login">
                  <Button className="w-full rounded-3xl">
                    Proceed to login
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                <Heading
                  type="h1"
                  className="m-auto text-center font-dmSansBold text-[24px]"
                >
                  Reset password
                </Heading>
                <Text className="text-center text-[14px] text-[#667084]">
                  Securely reset your password in just a few clicks!
                </Text>
              </div>
            )}
            {!isSuccess && (
              <div className="flex w-[342px] flex-col gap-4 md:w-[402px]">
                {/* <OtpInput
                value={payload.otpCode}
                valueLength={6}
                onChange={(value: string) =>
                  setPayload((prevPayload) => ({
                    ...prevPayload,
                    otpCode: value,
                  }))
                }
              /> */}
                <Input
                  label="Password"
                  name="newPassword"
                  placeholder="Enter Password"
                  type="password"
                  value={payload.newPassword}
                  error={!isEmpty(errors.newPassword)}
                  helperText={errors.newPassword}
                  onChange={handleChange}
                />
                <Input
                  label="Confirm Password"
                  placeholder="*******"
                  type="password"
                  name="confirmPassword"
                  value={payload.confirmPassword}
                  error={!isEmpty(errors.confirmPassword)}
                  helperText={errors.confirmPassword}
                  onChange={handleChange}
                />
                <Button
                  onClick={handleSubmit}
                  loading={isLoading}
                  className="w-full rounded-3xl bg-[#0A83FF] text-[16px]"
                >
                  Save Password
                </Button>
              </div>
            )}
            {/* <Text className="my-3 text-center text-[14px] text-[#667084]">
              Dont have an account yet.
              <Link href="/signup">
                <span className="text-[#0A83FF]">Create account</span>
              </Link>
            </Text> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
