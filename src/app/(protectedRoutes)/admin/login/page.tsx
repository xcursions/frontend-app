"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  identity: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [payload, setPayload] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const router = useRouter();
  // @ts-ignore
  const fromRoute = useSearchParams().get("clfrm");

  const [login, { isLoading, isError, isSuccess, data, error }] =
    useLoginMutation();
  useErrorHandler({ isError, error });
  useSuccessHandler({
    isSuccess,
    successFunction: () => {
      if (data?.data) {
        dispatch(setUserData(data?.data));
        dispatch(setUserToken(data?.meta?.token));
        if (!data?.data?.emailVerified) router.push("/verify");
        else if (!!fromRoute && fromRoute.includes("http"))
          window.location.replace(fromRoute);
        else
          router.replace(
            `${
              !!fromRoute && fromRoute !== "null"
                ? decodeURIComponent(fromRoute)
                : "/admin/dashboard"
            }`
          );
        // router.push("/admin/dashboard");
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
  return (
    <div className="h-screen  w-full overflow-hidden bg-[#E4E7EC]">
      <div className="lg:hidden">
        <Navbar text="black" logo="black" />
      </div>
      <div>
        <Link href="/" className="mx-auto flex justify-center">
          <img
            src="/assets/images/landing-page/logo_black.png"
            alt="login image"
            className=" mx-auto mt-[63px] w-auto  max-w-[132px] hover:cursor-pointer"
          />
        </Link>
      </div>
      <div className=" mx-auto mt-10 items-center justify-center">
        <div className="mx-auto max-w-[500px] content-center items-center justify-center  rounded-xl bg-[#FFFFFF] p-10">
          <Heading
            type="h1"
            className="m-auto text-center font-dmSansBold text-[24px]"
          >
            Login to your Account
          </Heading>
          <Text className="text-center text-[14px] text-[#667084]">
            Get Access to your account
          </Text>
          <div className="gap-4">
            <Input
              label="Email Address"
              placeholder="Enter your email address"
              name="identity"
              value={payload.identity}
              error={!isEmpty(errors.identity)}
              helperText={errors.identity}
              onChange={handleChange}
            />
            {/* <Input
              label="Email Address"
              placeholder="Enter your email address"
              name="identity"
              value={payload.identity}
              error={!isEmpty(errors.identity)}
              helperText={errors.identity}
              onChange={handleChange}
            /> */}
            <Input
              label="Password"
              name="password"
              placeholder="Enter Password"
              type="password"
              value={payload.password}
              error={!isEmpty(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
            />
            {/* <Input
              label="Password"
              name="password"
              placeholder="Enter Password"
              type="password"
              value={payload.password}
              error={!isEmpty(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
            /> */}
            <Text className=" pb-5 pt-3 text-center text-[14px] text-[#0A83FF] underline">
              <Link href="/forgot-password">Forgot Password</Link>
            </Text>
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
  );
};

export default Login;
