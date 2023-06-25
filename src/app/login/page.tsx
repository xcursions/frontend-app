"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import Text from "@/components/lib/Text/Text";
import Navbar from "@/components/public/Navbar";
import { useAppDispatch, useErrorHandler, useSuccessHandler } from "@/hooks";
import { useLoginMutation } from "@/services/auth";
import { setUserData, setUserToken } from "@/store/slices/userSlice";
import { validateLoginInputs } from "@/utils/validators";
import { isEmpty } from "@/utils/validators/helpers";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useAppDispatch();
  const [payload, setPayload] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const router = useRouter();

  const [login, { isLoading, isError, isSuccess, data, error }] =
    useLoginMutation();

  useErrorHandler({ isError, error });
  useSuccessHandler({
    isSuccess,
    showToast: false,
    successFunction: () => {
      if (data?.data) {
        dispatch(setUserData(data?.data));
        dispatch(setUserToken(data?.meta?.token));
        router.push("/user/dashboard");
      }
      return null;
    },
    toastMessage: "Log in successful!",
  });
  const handleSubmit = () => {
    setErrors(initialState);

    const { valid, errors: validationErrors } = validateLoginInputs(payload);

    if (valid) {
      login(payload);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };
  const handleGoogle = () => {
    signIn("google");
  };
  const handleFacebook = () => {
    signIn("facebook");
  };
  return (
    <div className="w-full  overflow-hidden bg-[#FFFFFF]">
      <div className="flex">
        <div className="relative hidden h-screen w-[40%] bg-[url('/assets/images/login.png')] lg:block">
          <img src="/assets/images/login.png" alt="login image" />
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
              ⛲️ <br />
              Escape to Paradise!
            </Text>
            <Text className="max-w-[419px] font-dmSansRegular text-[14px]">
              Book your dream vacation today with our exclusive travel deals.
              Unbeatable prices, top-notch service.
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
              Your gateway to unforgettable journeys 🏝️
            </Heading>
            <Text className="text-center text-[14px] text-[#667084]">
              Get Access to your account
            </Text>
            <div className="my-5 flex flex-col gap-3 lg:flex-row">
              <button
                onClick={handleGoogle}
                className="focus:shadow-outline mt-4 flex h-12 items-center
                 justify-center gap-3 rounded-3xl border-2 border-[#F2F4F7]
                  bg-[#F2F4F7] px-6 font-dmSansMedium text-[14px] text-black
                   transition-colors duration-300 hover:bg-slate-200"
              >
                <Image
                  src="/assets/images/icons/google.png"
                  width={20}
                  height={20}
                  alt="Google signin buttton"
                />
                <span>Login with Google</span>
              </button>
              <button
                onClick={handleFacebook}
                className="focus:shadow-outline mt-4 flex h-12 items-center
                 justify-center gap-3 rounded-3xl border-2 border-[#1877F2]
                  bg-[#1877F2] px-6 font-dmSansMedium text-[14px] text-[#FFFFFF]
                   transition-colors duration-300 hover:bg-[#1877f4dd]"
              >
                <Image
                  src="/assets/images/icons/facebook.png"
                  width={20}
                  height={20}
                  alt="Google signin buttton"
                />
                <span>Login with Facebook</span>
              </button>
            </div>
            <div className="my-5 flex items-center justify-center">
              <hr className="border-t-1 grow border-black" />
              <span className="mx-4 font-semibold text-gray-600">or</span>
              <hr className="border-t-1 grow border-black" />
            </div>
            <div className="gap-4">
              <Input
                label="Email Address"
                placeholder="Enter your email address"
                name="email"
                value={payload.email}
                error={!isEmpty(errors.email)}
                helperText={errors.email}
                onChange={handleChange}
              />
              <Input
                label="Password"
                name="password"
                placeholder="Enter Password"
                value={payload.password}
                error={!isEmpty(errors.password)}
                helperText={errors.password}
                onChange={handleChange}
              />
              <Link href="/forgot-password">
                <Text className=" pb-5 pt-3 text-center text-[14px] text-[#0A83FF] underline">
                  Forgot Password
                </Text>
              </Link>
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                className="w-full rounded-3xl bg-[#0A83FF] text-[16px]"
              >
                Login
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

export default Login;
