"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import Button from "@/components/lib/Button";
import FullPageLoader from "@/components/lib/FullPageLoader";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input";
import Text from "@/components/lib/Text/Text";
import Footer from "@/components/public/Footer/Footer";
import Navbar from "@/components/public/Navbar";
import Subscription from "@/components/public/Subscription/Subscription";
import { useAppSelector, useAuth } from "@/hooks";

import styles from "./page.module.scss";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const search = searchParams?.get("outing");
  // @ts-ignore
  const count = parseInt(searchParams?.get("count"), 10);
  const [inputValues, setInputValues] = useState(
    Array.from({ length: count && count - 1 }, () => "")
  );
  const { user } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAuth(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  const handleChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };
  console.log(inputValues);
  return (
    <>
      {!isAuthenticated ? (
        <FullPageLoader />
      ) : (
        <>
          <div className="bg-[#F9FAFB]">
            <Navbar text={"black"} logo={"black"} />
            <div className={styles.wrapper}>
              <div className={styles.container}>
                <div className={styles.card_container}>
                  <div className="rounded-2xl bg-[#ffffff] shadow-md">
                    <div className="ml-[31px] mt-[40px]">
                      <p className={styles.back} onClick={router.back}>
                        <AiOutlineArrowLeft /> Back
                      </p>
                      <Heading type="h1" className="mt-2 text-[30px]">
                        Checkout
                      </Heading>
                      <div className="max-w-[700px] rounded-2xl border p-3">
                        <Text className="text-[12px] text-[#475467] ">
                          Email Address
                        </Text>
                        <Text className="font-dmSansMedium text-[14px]">
                          {user?.email}
                        </Text>
                      </div>
                      <div className="my-5 mr-2 items-center justify-center">
                        <hr className="border-t-1 grow border-[#E4E7EC]" />
                      </div>
                      <div>
                        <Text className="font-dmSansBold text-[18px]">
                          Going with you ({count && count - 1})
                        </Text>
                        {count && count > 1 && (
                          <Text>
                            Enter the email address of people going with you
                          </Text>
                        )}

                        <div className="grid-col-1 mr-3 grid gap-3 md:grid-cols-2">
                          {inputValues.map((value, index) => (
                            <Input
                              label="Email Address"
                              type="email"
                              key={index}
                              value={value}
                              onChange={(e) =>
                                // @ts-ignore
                                handleChange(index, e.target.value)
                              }
                              placeholder={`Enter your Email Address`}
                            />
                          ))}
                        </div>
                        <Button className="my-5 mb-6 rounded-3xl">
                          Pay now
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <Subscription />
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Page;
