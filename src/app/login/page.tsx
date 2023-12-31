"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toaster from "react-hot-toast";
import * as yup from "yup";

// import { LoginSocialFacebook } from "reactjs-social-login";
import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import { HorizontalLineIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text/Text";
import Navbar from "@/components/public/Navbar";
import { useAppDispatch, useAuth } from "@/hooks";
import { useOnboardingChecker } from "@/hooks/useOnboardingChecker";
import { useGoogleLoginMutation, useLoginMutation } from "@/services/auth";
import {
  setUserAuthMethod,
  setUserData,
  setUserToken,
} from "@/store/slices/userSlice";

const registerSchema = yup.object({
  identity: yup.string().required("User name or email is required"),
  password: yup.string().required("password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, authData } = useAuth();
  const onboardingCheck = useOnboardingChecker();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const onSubmit = (formValues: any) => {
    login(formValues)
      .unwrap()
      .then((data) => {
        dispatch(setUserData(data?.data));
        dispatch(setUserToken(data?.meta?.token));
        dispatch(setUserAuthMethod("regular-auth"));
        toaster.success("Login Successful");
        router.push("/user/dashboard");
      })
      .catch((error) => {
        toaster.error(error?.data?.meta?.message);
      });
  };
  const onGoogleSubmit = (credentialResponse: any) => {
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
    if (isAuthenticated) {
      onboardingCheck(authData);
    }
    router.push("/user/dashboard");
    // return () => setDomLoading(false);
  }, [isAuthenticated]);
  return (
    <div className="w-full  overflow-hidden bg-[#FFFFFF]">
      <div className="flex">
        <div className="relative hidden h-screen w-[500px] lg:block">
          <Image
            src="/assets/images/login.png"
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
          <div className="m-auto mt-8 max-w-[344px] items-center justify-center  px-1 md:max-w-[482px] lg:mt-4">
            <Heading
              type="h1"
              className="m-auto text-center font-dmSansBold text-[24px]"
            >
              Your gateway to unforgettable journeys 🏝️
            </Heading>
            <Text className="text-center text-[14px] text-[#667084]">
              Get Access to your account
            </Text>
            <div className="my-5 flex flex-col items-center gap-3 lg:flex-row">
              <div className=" mt-5">
                <GoogleLogin
                  onSuccess={(credentialResponse) =>
                    onGoogleSubmit(credentialResponse?.credential)
                  }
                  onError={() => {}}
                  // @ts-ignore
                  scope="openid https://www.googleapis.com/auth/userinfo.email"
                  type="standard"
                  shape="pill"
                  text="signin_with"
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
            <div className="my-3 flex items-center justify-center gap-3 text-xs font-medium">
              <HorizontalLineIcon />
              <span>or</span>
              <HorizontalLineIcon />
            </div>
            <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email Address or Username"
                placeholder="Enter your email or username"
                name="identity"
                register={register("identity")}
                errorMsg={errors.identity?.message}
              />
              <Input
                label="Password"
                name="password"
                placeholder="Enter Password"
                type="password"
                register={register("password")}
                errorMsg={errors.password?.message}
              />
              <Link href="/forgot-password">
                <Text className=" pb-5 pt-3 text-center text-[14px] text-[#0A83FF] underline">
                  Forgot Password
                </Text>
              </Link>
              <Button
                type="submit"
                loading={isLoading}
                className="w-full rounded-3xl bg-[#0A83FF] text-[16px]"
              >
                Login
              </Button>
            </form>
            <Text className="my-3 text-center text-sm text-[#667084]">
              Dont have an account yet.{"  "}
              <Link href="/signup">
                <span className="text-[#0A83FF] underline">Create account</span>
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
