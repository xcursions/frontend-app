"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
// import Input from "@/components/lib/Input/Input";
import OtpInput from "@/components/lib/OtpInput/OtpInput";
import Text from "@/components/lib/Text/Text";
import Navbar from "@/components/public/Navbar";
import {
  useAppDispatch,
  useAppSelector,
  useErrorHandler,
  useSuccessHandler,
} from "@/hooks";
import { useVerifyForgotPasswordOtpMutation } from "@/services/auth";
import { selectUserEmail } from "@/store/selector/user.selector";
import { setUserData } from "@/store/slices/userSlice";
import { validateVerifyForgotPasswordOtpInputs } from "@/utils/validators";
// import { isEmpty } from "@/utils/validators/helpers";

const initialState = {
  email: "",
  otpCode: "",
};
const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(selectUserEmail);
  const [payload, setPayload] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const router = useRouter();

  const [login, { isLoading, isError, isSuccess, error, data }] =
    useVerifyForgotPasswordOtpMutation();
  useErrorHandler({ isError, error });
  useSuccessHandler({
    isSuccess,
    showToast: false,
    successFunction: () => {
      if (data) {
        dispatch(setUserData({ ...data, otpCode: payload.otpCode }));
        router.push("/verify-forgot-password");
      }
      return null;
    },
    toastMessage: "Otp Verified",
  });
  const handleSubmit = () => {
    setErrors(initialState);

    const { valid, errors: validationErrors } =
      validateVerifyForgotPasswordOtpInputs(payload);

    if (valid) {
      login(payload);
    } else {
      console.log(errors);
      setErrors(validationErrors);
    }
  };
  useEffect(() => {
    if (userEmail) {
      setPayload((prevPayload) => ({
        ...prevPayload,
        // eslint-disable-next-line object-shorthand
        email: userEmail,
      }));
    }
  }, []);

  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setPayload({ ...payload, [event.target.name]: event.target.value });
  //   };
  return (
    <div className="w-full  overflow-hidden bg-[#FFFFFF]">
      <div className="flex">
        <div className="relative hidden h-screen w-[40%] bg-[url('/assets/images/forgot_password.png')] lg:block">
          <img src="/assets/images/forgot_password.png" alt="login image" />
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
            <Heading
              type="h1"
              className="m-auto text-center font-dmSansBold text-[24px]"
            >
              Verify your account
            </Heading>
            <Text className="text-center text-[14px] text-[#667084]">
              A verification code has been sent to your email
            </Text>
            <div className="flex w-[342px] flex-col gap-4 md:w-[402px]">
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
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                className="w-full rounded-3xl bg-[#0A83FF] text-[16px]"
              >
                Verify Code
              </Button>
            </div>
            <Text className="my-3 text-center text-[14px] text-[#667084]">
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

export default ForgotPassword;
