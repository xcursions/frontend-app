// @ts-nocheck

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineClockCircle } from "react-icons/ai";
import { BsFillArrowRightCircleFill, BsLightningCharge } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi";
import { TbCalendar, TbCards, TbClock } from "react-icons/tb";

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
import {
  useAppSelector,
  useAuth,
  useErrorHandler,
  useSuccessHandler,
} from "@/hooks";
import { useGetAllOutingsQuery } from "@/services/public";
import {
  useGetBookingByIdQuery,
  useHandleBookingParticipantsMutation,
  useHandleCheckoutMutation,
} from "@/services/user";
import { useGetSavingPlanSummaryMutation } from "@/services/user/savingPlan";

import styles from "./page.module.scss";

const Page = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState<"instant" | "saving-plan" | "">("");
  const [paymentFrequency, setPaymentFrequency] = useState<
    "weekly" | "daily" | "monthly" | ""
  >("");
  const [paymentChannel, setPaymentChannel] = useState<
    "wallet" | "paystack" | ""
  >("");
  // @ts-ignore
  const { user } = useAppSelector((state) => state.user);
  const { booking } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAuth(true);
  const { data: tripInfo, isSuccess } = useGetAllOutingsQuery(
    `/${booking?.outingId || ""}`
  );
  const { data: bookingData, isSuccess: isBookingSuccess } =
    useGetBookingByIdQuery({
      query: booking?.outingId || "",
      id: booking?.id || "",
    });
  const [
    handleCheckout,
    {
      data: checkoutData,
      isSuccess: isCheckoutSuccess,
      isError: isCheckoutError,
      isLoading,
      error: checkoutError,
    },
  ] = useHandleCheckoutMutation();
  const [
    handleBookingParticipants,
    {
      // data: bookingParticipantData,
      isSuccess: isBookingParticipantSuccess,
      isError: isBookingParticipantError,
      isLoading: isBookingParticipantLoading,
      error: bookingParticipantError,
    },
  ] = useHandleBookingParticipantsMutation();
  const [
    getSavingPlanSummary,
    { data: savingPlanSummary, isSuccess: savingPlanSummarySuccess },
  ] = useGetSavingPlanSummaryMutation();

  useErrorHandler({
    isError: isBookingParticipantError,
    error: bookingParticipantError,
  });
  useErrorHandler({
    isError: isCheckoutError,
    error: checkoutError,
  });
  useSuccessHandler({
    isSuccess: isBookingParticipantSuccess,
  });
  useSuccessHandler({
    isSuccess: isCheckoutSuccess,
    successFunction: () => {
      if (checkoutData?.depositLink) {
        window.open(checkoutData?.depositLink, "_blank");
      } else {
        router.push("/user/booking");
      }
    },
    toastMessage: "Event Booked successfully!",
  });
  useEffect(() => {
    if (isBookingSuccess) {
      setCount(parseInt(bookingData?.ticketQuantity, 10));
    }
  }, [isBookingSuccess]);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  useEffect(() => {
    // Initialize data with the required number of objects based on the fetched count
    setData(
      // @ts-ignore
      Array.from({ length: count - 1 }, () => ({
        name: "",
        email: "",
        isSharing: true,
        individualType: "adult",
      }))
    );
  }, [count]);
  // @ts-ignore
  const handleInputChange = (index, field, value) => {
    setData((prevData) => {
      const newData = [...prevData];
      // @ts-ignore
      newData[index][field] = value;
      return newData;
    });
  };
  useEffect(() => {
    if (paymentFrequency) {
      getSavingPlanSummary({
        query: booking?.id,
        data: { periodicPaymentType: paymentFrequency },
      });
    }
  }, [paymentFrequency]);

  const handleInstantSubmit = () => {
    if (paymentChannel === "wallet" && plan === "instant") {
      handleCheckout({
        query: booking?.id,
        data: { paymentMethod: plan, channel: paymentChannel },
      });
    } else if (paymentChannel === "paystack" && plan === "instant") {
      handleCheckout({
        query: booking?.id,
        data: {
          paymentMethod: plan,
          channel: paymentChannel,
          callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/user/booking`,
        },
      });
    }
  };

  const handleSavingSubmit = () => {
    if (paymentChannel === "wallet" && plan === "saving-plan") {
      handleCheckout({
        query: booking?.id,
        data: {
          paymentMethod: plan,
          channel: paymentChannel,
          periodicPaymentType: paymentFrequency,
        },
      });
    } else if (paymentChannel === "paystack" && plan === "saving-plan") {
      handleCheckout({
        query: booking?.id,
        data: {
          paymentMethod: plan,
          channel: paymentChannel,
          callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/user/booking`,
          periodicPaymentType: paymentFrequency,
        },
      });
    }
  };

  const handleBookingParticipantsSubmit = () => {
    if (data?.length > 0) {
      handleBookingParticipants({
        query: booking?.outingId,
        id: booking?.id,
        data,
      });
    }
  };

  const handleSubmitChecker = () => {
    if (plan === "instant") {
      handleBookingParticipantsSubmit();
      handleInstantSubmit();
    } else if (plan === "saving-plan") {
      handleBookingParticipantsSubmit();
      handleSavingSubmit();
    }
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
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
                          Going ({count})
                        </Text>
                        {count && count > 1 && (
                          <Text className="mb-5 mt-3 text-[14px] text-[#475467]">
                            Enter the email address of people going with you
                          </Text>
                        )}

                        <div className="mr-3 grid grid-cols-1 gap-3">
                          {data.map((item, index) => (
                            <div
                              key={index}
                              className="grid w-full grid-cols-2 items-center gap-3 xl:gap-[32px]"
                            >
                              <Input
                                type="text"
                                label="Name"
                                placeholder={`Name ${index + 1}`}
                                // @ts-ignore
                                value={item.name}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "name",
                                    // @ts-ignore
                                    e.target.value
                                  )
                                }
                              />
                              <Input
                                type="email"
                                label="Email Address"
                                placeholder={`Email ${index + 1}`}
                                // @ts-ignore
                                value={item.email}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "email",
                                    // @ts-ignore
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          ))}
                          {count > 1 && (
                            <p className="text-[10px] text-[#F04438]">
                              Please enter details of people going on the trip
                            </p>
                          )}
                        </div>
                        <div className="my-5 mr-2 items-center justify-center">
                          <hr className="border-t-1 grow border-[#E4E7EC]" />
                        </div>
                        <Heading
                          type="h3"
                          className="font-dmSansBold text-[18px]"
                        >
                          {" "}
                          Payment Method
                        </Heading>
                        <div className="mt-[24px] flex flex-col gap-3 md:flex-row">
                          <div
                            onClick={() => setPlan("instant")}
                            className={`${
                              plan === "instant"
                                ? "border-2 border-blue-600"
                                : ""
                            } "max-h-[124px] shadow-sm" w-full max-w-[323px] cursor-pointer rounded-md border`}
                          >
                            <div className="mx-[18px] my-[20px] flex gap-2">
                              <BsLightningCharge className="font-dmSansBold text-xl text-[#FF860A]" />
                              <div>
                                <Text className="font-dmSansBold text-[14px] font-medium">
                                  Instant Payment
                                </Text>
                                <Text className=" mt-[16px] text-[12px]">
                                  Never be late again! Pay on time with Instant
                                  Payment
                                </Text>
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={() => setPlan("saving-plan")}
                            className={`${
                              plan === "saving-plan"
                                ? "border-2 border-blue-600"
                                : ""
                            } "max-h-[124px] shadow-sm" w-full max-w-[323px] cursor-pointer rounded-md border`}
                          >
                            <div className="mx-[18px] my-[20px] flex gap-2">
                              <TbClock className="font-dmSansBold text-xl text-[#860AFF]" />
                              <div>
                                <Text className="font-dmSansBold text-[14px] font-medium">
                                  Create a Trip savings Plan
                                </Text>
                                <Text className=" mt-[16px] text-[12px]">
                                  Never be late again! Pay in installment with
                                  Saving Payment Plan
                                </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                        {plan === "saving-plan" && (
                          <div className="flex gap-3">
                            <div className="mt-[32px]">
                              <Text className="font-dmSansRegular text-[14px] text-[#475467]">
                                Payment Frequency
                              </Text>
                              <div className="flex gap-2">
                                <div
                                  onClick={() => setPaymentFrequency("daily")}
                                  className={`flex-1 rounded-3xl px-3 py-2 text-center text-[14px] ${
                                    paymentFrequency === "daily"
                                      ? "bg-black text-white"
                                      : "bg-gray-200 text-[#667084]"
                                  } cursor-pointer`}
                                >
                                  Daily
                                </div>
                                <div
                                  onClick={() => setPaymentFrequency("weekly")}
                                  className={`ml-[-15px] flex-1 rounded-3xl px-3 py-2 text-center text-[14px] ${
                                    paymentFrequency === "weekly"
                                      ? "bg-black text-white"
                                      : "bg-gray-200 text-[#667084]"
                                  } cursor-pointer`}
                                >
                                  Weekly
                                </div>
                                <div
                                  onClick={() => setPaymentFrequency("monthly")}
                                  className={`ml-[-15px] flex-1 rounded-3xl px-3 py-2 text-center text-[14px] ${
                                    paymentFrequency === "monthly"
                                      ? "bg-black text-white"
                                      : "bg-gray-200 text-[#667084]"
                                  } cursor-pointer`}
                                >
                                  Monthly
                                </div>
                              </div>
                              <p className="mt-[24px] text-[12px] text-[#F04438]">
                                You must complete payment before the payment
                                deadline
                              </p>
                            </div>
                            <div className="my-[32px] w-[295px] rounded-2xl bg-[#F9FAFB] p-3 md:w-[324px]">
                              <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                                First Payment
                              </Text>
                              <Text className="font-dmSansBold text-[30px] text-[#101828]">
                                ₦
                                {savingPlanSummarySuccess &&
                                  savingPlanSummary?.initialPaymentAmount}
                              </Text>
                              {savingPlanSummarySuccess && (
                                <p className="text-[14px] text-[#667084]">
                                  {savingPlanSummary?.initialPaymentAmount !==
                                    undefined &&
                                  savingPlanSummary?.remainingAmount !==
                                    undefined
                                    ? `${(
                                        (parseFloat(
                                          savingPlanSummary.initialPaymentAmount
                                        ) /
                                          (parseFloat(
                                            savingPlanSummary.initialPaymentAmount
                                          ) +
                                            parseFloat(
                                              savingPlanSummary.remainingAmount
                                            ))) *
                                        100
                                      ).toFixed(1)}% of your travel Fee`
                                    : "Percentage calculation not possible"}
                                </p>
                              )}
                              <div className="my-[32px] rounded-xl bg-[#FFF] p-3">
                                <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                                  Other Payment
                                </Text>
                                <Text className="font-dmSansBold text-[30px] text-[#101828]">
                                  ₦
                                  {savingPlanSummarySuccess &&
                                    savingPlanSummary?.paymentPerBillingCycle}
                                  <span className="text-[12px] text-[#667084]">
                                    /{savingPlanSummary?.periodicPaymentType}
                                  </span>
                                </Text>
                              </div>
                              <Button
                                className="w-full rounded-3xl"
                                onClick={toggleModal}
                                disabled={
                                  !paymentFrequency ||
                                  (count > 1 && !data[0].name)
                                }
                              >
                                Pay Now
                              </Button>
                            </div>
                          </div>
                        )}
                        {plan !== "saving-plan" && (
                          <Button
                            className="my-5 mb-6 rounded-3xl"
                            disabled={
                              plan !== "instant" || (count > 1 && !data[0].name)
                            }
                            onClick={toggleModal}
                          >
                            Pay Now
                          </Button>
                        )}
                        {isBookingParticipantLoading ||
                          (isLoading && <FullPageLoader />)}
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
                            src={tripInfo?.outingGallery[0]?.image}
                            alt={tripInfo?.name}
                            width={80}
                            height={80}
                            className="h-[80px] w-[80px] rounded-xl "
                          />
                          <div>
                            <Text className="font-dmSansBold text-[18px] text-[#101828]">
                              {tripInfo?.name}
                            </Text>
                            <Text className="font-dmSansBold text-[16px] text-[#0A83FF] ">
                              ₦{parseInt(tripInfo?.price, 10).toLocaleString()}
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
                          {isBookingSuccess &&
                            formatDatesRange(
                              bookingData?.bookingDate?.startDate,
                              bookingData?.bookingDate?.endDate
                            )}
                        </Text>
                        <Text className="flex items-center gap-3">
                          <AiOutlineClockCircle />{" "}
                          {isBookingSuccess &&
                            Math.floor(
                              formatWeeksRange(
                                bookingData?.bookingDate?.startDate,
                                bookingData?.bookingDate?.endDate
                              )
                            )}{" "}
                          weeks
                        </Text>
                        <div className="my-7 mr-3 flex items-center gap-3 rounded-3xl bg-[#FFECEB] py-2">
                          <AiOutlineClockCircle className="ml-3 text-[#F04438]" />{" "}
                          <Text className="text-[12px] text-[#601B16]">
                            Deadline for payment is{" "}
                            {isSuccess &&
                              isBookingSuccess &&
                              SubtractDate(
                                bookingData?.bookingDate?.startDate,
                                tripInfo?.deadlineGap
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
                            ₦{parseInt(bookingData?.cost, 10).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
                    onClick={toggleModal}
                  ></div>
                  <div className="fixed inset-0 z-[32] flex w-[326px] items-center justify-center lg:left-[510px] lg:w-[418px]">
                    <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                      <div className="flex justify-between">
                        <Heading
                          type="h3"
                          className="text-[18px] text-[#101828]"
                        >
                          Select Payment Method
                        </Heading>
                        <p
                          className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                          onClick={toggleModal}
                        >
                          <FaTimes />
                        </p>
                      </div>
                      <div className="flex flex-col gap-5 py-5">
                        <div
                          className={`${
                            paymentChannel === "wallet" && "border shadow-lg"
                          } flex h-[56px] cursor-pointer items-center gap-4 rounded-2xl bg-[#FFF5EB]`}
                          onClick={() => setPaymentChannel("wallet")}
                        >
                          <span className="pl-5 text-[24px] text-[#FF860A]">
                            <TbCards />
                          </span>
                          <p className="cursor-pointer text-[15px] text-[#475467]">
                            Pay with Wallet
                          </p>
                        </div>
                        <div
                          className={`${
                            paymentChannel === "paystack" && "border shadow-lg"
                          } flex h-[56px] cursor-pointer items-center gap-4 rounded-2xl bg-[#00C3F71A]`}
                          onClick={() => setPaymentChannel("paystack")}
                        >
                          <img
                            src="/assets/images/icons/paystack.png"
                            className="pl-5"
                            alt="paystack"
                          />
                          <p className="cursor-pointer">Pay with Paystack</p>
                        </div>
                        <Button
                          className="cursor-pointer rounded-3xl text-[14px]"
                          disabled={!paymentChannel}
                          onClick={handleSubmitChecker}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
