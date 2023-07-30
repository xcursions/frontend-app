"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineClockCircle } from "react-icons/ai";
import { BsFillArrowRightCircleFill, BsLightningCharge } from "react-icons/bs";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { TbCalendar, TbClock } from "react-icons/tb";

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
import { Switch } from "@/components/ui/switch";
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

import styles from "../page.module.scss";

const Page = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [plan, setPlan] = useState("");
  const { user } = useAppSelector((state) => state.user);
  const { booking } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAuth(true);
  const { data: tripInfo, isSuccess } = useGetAllOutingsQuery(
    `/${booking?.outingId}`
  );
  const { data: bookingData, isSuccess: isBookingSuccess } =
    useGetBookingByIdQuery({ query: booking.outingId, id: booking.id });
  const [
    handleCheckout,
    {
      // data: checkoutData,
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

  const payload = {
    paymentMethod: plan,
  };
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
    successFunction: () => {
      handleCheckout({ query: booking.id, data: payload });
    },
  });
  useSuccessHandler({
    isSuccess: isCheckoutSuccess,
    successFunction: () => {
      router.push("/user/wallet");
    },
    toastMessage: "Trip Booked successfully!",
  });
  useEffect(() => {
    if (isBookingSuccess) {
      setCount(
        parseInt(bookingData?.bookingParticipantCount.numberOfAdults, 10)
      );
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
  const handleToggleChange = (index: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      // @ts-ignore
      newData[index].isSharing = !newData[index].isSharing;
      return newData;
    });
  };
  const handleSubmit = () => {
    if (data.length > 0) {
      handleBookingParticipants({
        query: booking.outingId,
        id: booking.id,
        data,
      });
    } else {
      handleCheckout({ query: booking.id, data: payload });
    }
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
                        <div className="flex justify-between">
                          <Text className="font-dmSansMedium text-[14px]">
                            {isBookingSuccess && bookingData?.user?.email}
                          </Text>
                          <Switch />
                        </div>
                      </div>
                      {count > 1 && (
                        <div className="my-5 mr-2 items-center justify-center">
                          <hr className="border-t-1 grow border-[#E4E7EC]" />
                        </div>
                      )}
                      <div className="md:mt-[25px]">
                        {count > 1 && (
                          <>
                            <Text className="font-dmSansBold text-[18px]">
                              Going with you
                            </Text>
                            <Text className="mb-5 mt-3 text-[14px] text-[#475467]">
                              Enter the email address of people going with you
                            </Text>
                          </>
                        )}

                        <div className="mr-3 grid grid-cols-1 gap-3">
                          {data.map((item, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-3 items-center gap-3 xl:gap-[32px]"
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
                              <div className="flex items-center gap-1">
                                <p>Sharing</p>
                                <Switch
                                  // @ts-ignore
                                  checked={item.isSharing}
                                  onCheckedChange={() =>
                                    handleToggleChange(index)
                                  }
                                />
                              </div>
                              {/* <select
                                value={item.individualType}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "individualType",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="adult">Adult</option>
                                <option value="children">Children</option>
                                <option value="infants">Infants</option>
                              </select> */}
                            </div>
                          ))}
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
                                  Never be late again! Pay on time with Instant
                                  Payment
                                </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          className="my-5 mb-6 rounded-3xl"
                          disabled={plan.length === 0}
                          onClick={handleSubmit}
                        >
                          Pay now
                        </Button>
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
                        <div className="mt-[32px] flex items-center gap-3">
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
                        <Text className="mt-4 flex items-center gap-3 text-[14px] text-[#0A83FF]">
                          <MdOutlineFlightTakeoff className="text-xl" />
                          {booking.outingSubType}
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
                          <div className="">
                            <Text className="text-[14px]">
                              {isBookingSuccess &&
                                bookingData?.bookingParticipantCount
                                  .numberOfAdults}{" "}
                              Adult
                            </Text>
                            <Text className="text-[14px]">
                              {isBookingSuccess &&
                                bookingData?.bookingParticipantCount
                                  .numberOfInfants}{" "}
                              Infant
                            </Text>
                            <Text className="text-[14px]">
                              {isBookingSuccess &&
                                bookingData?.bookingParticipantCount
                                  .numberOfChildren}{" "}
                              Children
                            </Text>
                          </div>
                        </div>
                        <div className="flex justify-between py-2 pr-3 text-[14px] text-[#667084]">
                          <Text className="text-[14px]">Addons</Text>
                          {isBookingSuccess &&
                          bookingData.bookingAddon.length > 0 ? (
                            <div>
                              {bookingData.bookingAddon.map((name: any) => (
                                <Text
                                  className="my-1 w-fit text-[12px]"
                                  key={name.id}
                                >
                                  {name.outingAddon.name}
                                </Text>
                              ))}
                            </div>
                          ) : (
                            <span>No Addons</span>
                          )}
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
