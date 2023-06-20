"use client";

// import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import React, { useState } from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import Text from "@/components/lib/Text/Text";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [payload, setPayload] = useState(initialState);
  const handleSubmit = () => {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };
  return (
    <div className="w-full  overflow-hidden bg-[#FFFFFF]">
      <div className="flex">
        <div className="relative h-screen w-[40%] bg-[url('/assets/images/login.png')]">
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
        <div className="m-auto content-center items-center justify-center">
          <div className="m-auto items-center justify-center">
            <Heading type="h1" className="m-auto font-dmSansBold text-[24px]">
              Your gateway to unforgettable journeys 🏝️
            </Heading>
            <Text className="text-center text-[14px] text-[#667084]">
              Get Access to your account
            </Text>
            <div className="my-5">
              {/* <GoogleLogin
                onSuccess={() => {}}
                onError={() => console.log("Error")}
              /> */}
            </div>
            <div className="my-5 flex items-center justify-center">
              <hr className="grow border-t-2 border-black" />
              <span className="mx-4 font-semibold text-gray-600">or</span>
              <hr className="grow border-t-2 border-black" />
            </div>
            <div className="gap-4">
              <Input
                label="Email Address"
                placeholder="Enter your email address"
                name="email"
                value={payload.email}
                onChange={handleChange}
              />
              <Input
                label="Password"
                name="password"
                placeholder="Enter Password"
                value={payload.password}
                onChange={handleChange}
              />
              <Button onClick={handleSubmit}>Login</Button>
            </div>
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

export default Login;
