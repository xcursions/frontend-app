"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import Text from "@/components/lib/Text/Text";
import Navbar from "@/components/public/Navbar/Navbar";
import {
  useAppDispatch,
  useErrorHandler,
  usePasswordChecker,
  useSuccessHandler,
} from "@/hooks";
import { useRegisterMutation } from "@/services/auth";
import { setUserData } from "@/store/slices/userSlice";
import { validateRegisterInputs } from "@/utils/validators";
import { isEmpty } from "@/utils/validators/helpers";

const initialState = {
  fullName: "",
  username: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [payload, setPayload] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(initialState);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [register, { isLoading, data, isError, error, isSuccess }] =
    useRegisterMutation();

  useErrorHandler({ isError, error });
  useSuccessHandler({
    isSuccess,
    successFunction: () => {
      dispatch(setUserData(data?.data));
      // dispatch(setUserToken(data.token));
      router.push("/verify");
    },
    toastMessage: "Account created successfully!",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };
  const handleConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const handleSubmit = () => {
    setErrors(initialState);

    const { valid, errors: validationErrors } = validateRegisterInputs(payload);

    if (valid) {
      register(payload);
    } else {
      setErrors(validationErrors);
    }
  };
  const [validLength, hasNumber, upperCase, lowerCase, specialChar] =
    usePasswordChecker(payload);
  const isFormValid =
    Object.values(payload).every((value) => value !== "") &&
    validLength &&
    hasNumber &&
    upperCase &&
    lowerCase &&
    specialChar &&
    confirmPassword === payload.password;

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: (tokenResponse) => console.log(tokenResponse),
  });
  return (
    <div className="w-full  overflow-hidden bg-[#FFFFFF]">
      <div className="flex">
        <div className="relative hidden h-screen w-[40%] bg-[url('/assets/images/login.png')] lg:block">
          <img src="/assets/images/login.png" alt="login image" />
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
              Let&apos;s explore the world together ✈️
            </Heading>
            <Text className="text-center text-[14px] text-[#667084]">
              Create your account
            </Text>
            <div className="my-3 flex flex-col gap-3 lg:flex-row">
              <button
                onClick={() => googleLogin}
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
                onClick={() => {}}
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
            <div className="my-3 flex items-center justify-center">
              <hr className="grow border-t-2 border-black" />
              <span className="mx-4 font-semibold text-gray-600">or</span>
              <hr className="grow border-t-2 border-black" />
            </div>
            <div className="">
              <Input
                label="Full Name"
                placeholder="John Doe"
                name="fullName"
                value={payload.fullName}
                error={!isEmpty(errors.fullName)}
                helperText={errors.fullName}
                onChange={handleChange}
              />
              <Input
                label="Username"
                placeholder="@johndoe1234"
                name="username"
                value={payload.username}
                error={!isEmpty(errors.username)}
                helperText={errors.username}
                onChange={handleChange}
              />
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
              <Input
                label="Confirm Password"
                placeholder="*******"
                type="password"
                name="confirm password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
              <div className="flex flex-col  text-xs">
                <p
                  className={`${
                    validLength && hasNumber && specialChar
                      ? "text-green-400"
                      : "text-red-500"
                  }`}
                >
                  Must be more than 8 digit, have number and special characters
                </p>
                <p
                  className={`${
                    lowerCase && upperCase ? "text-green-400" : "text-red-500"
                  }`}
                >
                  Must have lower and uppercase
                </p>
                <p
                  className={`${
                    confirmPassword === payload.password
                      ? "text-green-400"
                      : "text-red-500"
                  }`}
                >
                  Confirm password must match
                </p>
              </div>
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                disabled={!isFormValid}
                className="w-full"
              >
                Create Account
              </Button>
            </div>
            <Text type="caption" className="mt-0 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-[#0A83FF]">
                Login
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
