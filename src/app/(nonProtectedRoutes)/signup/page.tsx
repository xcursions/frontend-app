"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toaster from "react-hot-toast";
import * as yup from "yup";

// import { LoginSocialFacebook } from "reactjs-social-login";
import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import { HorizontalLineIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text/Text";
import TopNavBar from "@/components/public/TopNavBar";
import { useAppDispatch } from "@/hooks";
import { useGoogleLoginMutation, useRegisterMutation } from "@/services/auth";
import {
  setUserAuthMethod,
  setUserData,
  setUserToken,
} from "@/store/slices/userSlice";

const registerSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  username: yup.string().required("User name is required"),
  email: yup.string().email().required(" Email is required"),
  password: yup
    .string()
    .required()
    .min(8, "must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState("");
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const [createUser, { isLoading }] = useRegisterMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const onSubmit = (formValues: any) => {
    let payload;
    if (referralCode.length > 1) {
      payload = { ...formValues, referralCode };
    } else {
      payload = { ...formValues };
    }
    // const payload = { ...formValues };
    createUser(payload)
      .unwrap()
      .then((data) => {
        dispatch(setUserData(data?.data));
        toaster.success("Account created successfully!");
        router.push("/verify");
      })
      .catch((error) => {
        toaster.error(error?.data?.meta?.message);
      });
  };
  const code = searchParams?.get("referral-code");
  const onGoogleSubmit = (credentialResponse: any) => {
    if (code) {
      googleLogin({ idToken: credentialResponse, referralCode })
        .unwrap()
        .then((data) => {
          dispatch(setUserData(data?.data));
          dispatch(setUserToken(data?.meta?.token));
          dispatch(setUserAuthMethod("social-auth"));
          toaster.success("Successfully logged in using Google");
          router.push("/user/dashboard");
        })
        .catch((error) => {
          toaster.error(error?.data?.meta?.message);
        });
    }
    googleLogin({ idToken: credentialResponse })
      .unwrap()
      .then((data) => {
        dispatch(setUserData(data?.data));
        dispatch(setUserToken(data?.meta?.token));
        dispatch(setUserAuthMethod("social-auth"));
        toaster.success("Successfully logged in using Google");
        router.push("/user/dashboard");
      })
      .catch((error) => {
        toaster.error(error?.data?.meta?.message);
      });
  };
  useEffect(() => {
    if (code) {
      setReferralCode(code);
    }
  }, [code]);
  return (
    <div className="w-full  overflow-hidden bg-[#FFFFFF]">
      <div className="lg:hidden">
        <TopNavBar />
      </div>
      <div className="flex">
        <div className="relative hidden h-screen w-[500px] lg:block">
          <Image
            src="/assets/images/login.png"
            alt="login image"
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
              ⛲️ <br />
              Escape to Paradise!
            </Text>
            <Text className="max-w-[419px] font-dmSansRegular text-[14px]">
              Book your dream vacation today with our exclusive travel deals.
              Unbeatable prices, top-notch service.
            </Text>
          </div>
        </div>
        <div className="m-auto mt-16 content-center items-center justify-center lg:mt-auto">
          <div className="m-auto mt-8 max-w-[344px] items-center  justify-center px-1 md:max-w-[482px] lg:mt-4">
            <Heading
              type="h1"
              className="m-auto w-[314px] text-center font-dmSansBold text-[24px] md:w-auto"
            >
              Let&apos;s explore the world together ✈️
            </Heading>
            <Text className="text-center text-[14px] text-[#667084]">
              Create your account
            </Text>
            <div className="my-3 flex flex-col gap-3 lg:flex-row">
              <div className=" mt-5">
                <GoogleLogin
                  onSuccess={
                    (credentialResponse) =>
                      onGoogleSubmit(credentialResponse?.credential)
                    // googleLogin({ idToken: credentialResponse?.credential })
                  }
                  onError={() => {}}
                  // @ts-ignore
                  scope="openid https://www.googleapis.com/auth/userinfo.email"
                  type="standard"
                  shape="pill"
                  text="signup_with"
                  size="large"
                />
              </div>
              {/* <LoginSocialFacebook
                appId={`${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}`}
                onResolve={(response) => console.log(response)}
                onReject={(er) => console.log(er)}
              > */}
              <button
                className="focus:shadow-outline mt-4 flex h-10 items-center
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
              {/* </LoginSocialFacebook> */}
            </div>
            <div className="my-2 flex items-center justify-center gap-3 text-xs font-medium">
              <HorizontalLineIcon />
              <span>or</span>
              <HorizontalLineIcon />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[8px]"
            >
              <Input
                label="Full Name"
                placeholder="John Doe"
                name="fullName"
                register={register("fullName")}
                errorMsg={errors?.fullName?.message}
              />
              <Input
                label="Username"
                placeholder="@johndoe1234"
                name="username"
                register={register("username")}
                errorMsg={errors.username?.message}
              />
              <Input
                label="Email Address"
                placeholder="Enter your email address"
                name="email"
                register={register("email")}
                errorMsg={errors.email?.message}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter Password"
                register={register("password")}
                errorMsg={errors.password?.message}
              />
              <Input
                label="Referral Code (Optional)"
                placeholder="Enter referral code"
                name="referral code"
                value={referralCode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setReferralCode(event.target.value)
                }
              />
              <Button
                type="submit"
                loading={isLoading}
                // disabled={!isFormValid}
                className="my-[16px] w-full rounded-[100px] text-[16px]"
              >
                Create Account
              </Button>
            </form>
            <Text className="mt-0 text-center text-sm text-[#667084]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#0A83FF]">
                <span className="underline">Login</span>
              </Link>
            </Text>
            <Text className="my-[1rem] text-center text-sm text-[#667084] underline">
              <Link href="/privacy-policy">Privacy</Link> &{" "}
              <Link href="/terms">Terms</Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
