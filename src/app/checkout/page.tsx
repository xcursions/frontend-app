"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineClockCircle } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { HiOutlineTicket } from "react-icons/hi";
import { TbCalendar } from "react-icons/tb";

import Button from "@/components/lib/Button";
import {
  formatDatesRange,
  formatWeeksRange,
} from "@/components/lib/FormatWeekRange/FormatWeekRage";
import FullPageLoader from "@/components/lib/FullPageLoader";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input";
import { SubtractDate } from "@/components/lib/SubtractDate/SubtractDate";
import Text from "@/components/lib/Text/Text";
import Footer from "@/components/public/Footer/Footer";
import Navbar from "@/components/public/Navbar";
import Subscription from "@/components/public/Subscription/Subscription";
import { useAppSelector, useAuth } from "@/hooks";
import { useGetAllOutingsQuery } from "@/services/public";

import styles from "./page.module.scss";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams?.get("outing");
  // @ts-ignore
  const count = parseInt(searchParams?.get("count"), 10);
  const [inputValues, setInputValues] = useState(
    Array.from({ length: count && count - 1 }, () => "")
  );
  const { user } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAuth(true);
  const { data, isSuccess } = useGetAllOutingsQuery(`/${search}`);

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
                  <div className="mx-auto max-w-[818px] rounded-2xl bg-[#ffffff] shadow-md md:mx-0">
                    <div className="ml-[12px] mr-2 mt-[40px] md:ml-[31px]">
                      <p className={styles.back} onClick={router.back}>
                        <AiOutlineArrowLeft /> Back
                      </p>
                      <Heading type="h1" className="mt-2 text-[30px]">
                        Checkout
                      </Heading>
                      <div className="mb-[32px] mt-[48px] max-w-[700px] rounded-2xl border p-3">
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
                      <div className="md:mt-[25px]">
                        <Text className="font-dmSansBold text-[18px]">
                          Going with you ({count && count - 1})
                        </Text>
                        {count && count > 1 && (
                          <Text className="mb-5 mt-3 text-[14px] text-[#475467]">
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
                  <div className="flex flex-col gap-4">
                    <div className="mx-auto max-w-[427px] rounded-2xl bg-[#ffffff] shadow-md md:mx-0">
                      <div className="ml-[30px] mt-[40px]">
                        <Text className="font-dmSansBold text-[16px]">
                          Event Summary
                        </Text>
                        <div className="mt-[32px] flex gap-3">
                          <Image
                            src={data?.outingGallery[0]?.image}
                            alt={data?.name}
                            width={100}
                            height={100}
                          />
                          <div>
                            <Text className="font-dmSansBold text-[18px] text-[#101828]">
                              {data?.name}
                            </Text>
                            <Text className="font-dmSansBold text-[16px] text-[#0A83FF] ">
                              ₦{parseInt(data?.price, 10).toLocaleString()}
                            </Text>
                          </div>
                        </div>
                        <Text className="mt-5 flex items-center gap-3 text-[14px]">
                          <span className="font-dmSansMedium text-[16px] text-[#0A83FF]">
                            <HiOutlineTicket />
                          </span>
                          {count} Ticket{count === 1 ? "" : "s"}
                        </Text>
                        <Text className=" my-5 flex gap-3 font-dmSansRegular text-[14px] text-[#475467]">
                          <TbCalendar className=" text-xl text-[#475467]" />
                          {isSuccess &&
                            formatDatesRange(
                              data?.outingDate[0]?.startDate,
                              data?.outingDate[0]?.endDate
                            )}
                        </Text>
                        <Text className="flex items-center gap-3">
                          <AiOutlineClockCircle />{" "}
                          {isSuccess &&
                            Math.floor(
                              formatWeeksRange(
                                data?.outingDate[0]?.startDate,
                                data?.outingDate[0]?.endDate
                              )
                            )}{" "}
                          weeks
                        </Text>
                        <div className="my-7 mr-3 flex items-center gap-3 rounded-3xl bg-[#FFECEB] py-2">
                          <AiOutlineClockCircle className="ml-3 text-[#F04438]" />{" "}
                          <Text className="text-[12px] text-[#601B16]">
                            Deadline for payment is{" "}
                            {isSuccess &&
                              SubtractDate(
                                data?.outingDate[0]?.startDate,
                                data?.deadlineGap
                              )}
                          </Text>
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto max-w-[427px] rounded-2xl bg-[#ffffff] shadow-md md:mx-0">
                      <div className="ml-[30px] mt-[40px]">
                        <Text className="font-dmSansBold text-[16px]">
                          Payment
                        </Text>
                        <div className="pr-3">
                          <Input
                            placeholder="Discount code here"
                            endIcon={
                              <BsFillArrowRightCircleFill className="text-[#0A83FF]" />
                            }
                          />
                        </div>
                        <div className="flex justify-between py-2 pr-3 text-[14px] text-[#667084]">
                          <Text className="text-[14px]">No of tickets</Text>
                          <span>{count}</span>
                        </div>
                        <div className="flex justify-between py-2 pr-3 text-[14px] text-[#667084]">
                          <Text className="text-[14px]">Discount</Text>
                          <span>₦0</span>
                        </div>
                        <div className="my-5 mr-2 items-center justify-center">
                          <hr className="border-t-1 grow border-[#E4E7EC]" />
                        </div>
                        <div className="flex justify-between pb-5 pr-3">
                          <Text className="text-[14px] text-[#667084]">
                            Total
                          </Text>
                          <span className="text-[18px] text-[#101828] ">
                            ₦
                            {isSuccess && data.price
                              ? (
                                  parseInt(data.price, 10) * count
                                ).toLocaleString()
                              : "Not available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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
