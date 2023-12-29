"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import Text from "@/components/lib/Text/Text";
import Navbar from "@/components/public/Navbar";
import { useAppDispatch, useErrorHandler, useSuccessHandler } from "@/hooks";
import { useForgotPasswordMutation } from "@/services/auth";
import { setUserData } from "@/store/slices/userSlice";
import { validateForgotPasswordInputs } from "@/utils/validators";
import { isEmpty } from "@/utils/validators/helpers";

const initialState = {
  email: "",
};
const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const [payload, setPayload] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const router = useRouter();

  const [login, { isLoading, isError, isSuccess, data, error }] =
    useForgotPasswordMutation();
  useErrorHandler({ isError, error });
  useSuccessHandler({
    isSuccess,
    showToast: false,
    successFunction: () => {
      if (data?.data) {
        dispatch(setUserData({ ...data?.data, email: payload.email }));
        router.push("/verify-forgot-password/otp");
      }
      return null;
    },
    toastMessage: "Log in successful!",
  });
  const handleSubmit = () => {
    setErrors(initialState);

    const { valid, errors: validationErrors } =
      validateForgotPasswordInputs(payload);

    if (valid) {
      login(payload);
    } else {
      setErrors(validationErrors);
    }
  };

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
              src="/assets/images/verify_password2.png"
              alt="login image"
              className="mx-auto h-[120px] w-[90px] items-center pb-10"
            />
            <Heading
              type="h1"
              className="m-auto text-center font-dmSansBold text-[24px]"
            >
              Forgot Password
            </Heading>
            <Text className="text-center text-[14px] text-[#667084]">
              Reset your password in just a few clicks!
            </Text>
            <div className="flex w-[342px] flex-col gap-4 pt-10 md:w-[402px]">
              <Input
                label="Email Address"
                placeholder="Enter your email address"
                name="email"
                value={payload.email}
                error={!isEmpty(errors.email)}
                helperText={errors.email}
                onChange={handleChange}
              />
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                className="w-full rounded-3xl bg-[#0A83FF] text-[16px]"
              >
                Reset Password
              </Button>
              <Text className="mx-auto text-[14px]">
                Remember Password.
                <span className="text-[#0A83FF]">
                  <Link href={"/login"}>Login</Link>
                </span>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
