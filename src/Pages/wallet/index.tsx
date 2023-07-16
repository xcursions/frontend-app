import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsCalendarX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { TbBuildingBank, TbCards } from "react-icons/tb";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import Select from "@/components/lib/Select/Select";
import Text from "@/components/lib/Text/Text";
import { useSuccessHandler } from "@/hooks";
import {
  useGetAllOutingsQuery,
  useLazySearchOutingsQuery,
} from "@/services/public";
import {
  useGetTransactionsQuery,
  useGetWalletBalanceQuery,
  useInitiateLinkDepositMutation,
} from "@/services/user";

import { columns } from "./services/Colums";
import { DataTable } from "./services/DataTable";
import styles from "./wallet.module.scss";

const initialState = {
  trip: "",
  amount: "",
};

const Wallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const [trips, setTrips] = useState([]);
  const { data: tripsList, isSuccess } = useGetAllOutingsQuery("?limit=50");
  const [singleTrip, { data: singleTripData, isSuccess: isSingleSuccess }] =
    useLazySearchOutingsQuery();
  const { data: walletBalance, isSuccess: walletBallanceSuccess } =
    useGetWalletBalanceQuery();
  const { data: transactionHistory, isSuccess: transactionHistorySuccess } =
    useGetTransactionsQuery("?limit=5");
  const [initiateLinkDeposit, { data: linkDeposit, isSuccess: linkSuccess }] =
    useInitiateLinkDepositMutation();
  useSuccessHandler({
    isSuccess,
    showToast: false,
    successFunction: () => {
      setTrips(tripsList.result);
    },
  });
  useSuccessHandler({
    isSuccess: linkSuccess,
    showToast: true,
    successFunction: () => {
      console.log(linkDeposit);
      window.open(linkDeposit?.depositLink, "_blank");
    },
  });
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchSingleTrip = async () => {
      await singleTrip(`/${payload.trip}`);
    };

    if (payload.trip.length > 0) {
      fetchSingleTrip();
    }

    return () => {
      console.log("value not given");
    };
  }, [payload.trip, singleTrip]);
  const formatedDate = (date: string) => {
    const dob = new Date(date);
    const dobArr = dob.toDateString().split(" ");
    return `${dobArr[1]} ${dobArr[2]}`;
  };
  const formatedDate2 = (date: string) => {
    const dob = new Date(date);
    const dobArr = dob.toDateString().split(" ");
    return `${dobArr[1]} ${dobArr[2]}`;
  };
  const handleLinkSubmit = () => {
    if (payload.amount.length > 0) {
      initiateLinkDeposit({ amount: payload.amount });
    }
  };
  const data =
    transactionHistorySuccess &&
    transactionHistory.result.map((res: any) => {
      return {
        amount: parseFloat(res.transaction.amount),
        status: res.transaction.status,
        id: res.transaction.id,
        createdAt: res.transaction.createdAt.split("T")[0],
      };
    });
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Heading className="pl-2 pt-[40px] font-dmSansBold text-[24px] text-[#101828] lg:pl-[31px]">
          Wallet
        </Heading>
        <Text className="pl-2 text-[14px] text-[#667084] lg:pl-[31px] lg:text-[16px]">
          Welcome back to your dashboard
        </Text>
        <div className="flex flex-col gap-[25px] lg:flex-row">
          <div className={styles.horizontal_div}>
            <div className=" absolute z-50 mx-auto items-center pb-[31px] pl-[40px] pt-[33px]">
              <Text className="text-[14px] text-[#FFFFFF] lg:text-[16px]">
                Total balance
              </Text>
              <div className="mt-[8px] flex items-center gap-3">
                <Text className="text-[24px]  text-[#FFFFFF] lg:text-[30px]">
                  ₦{walletBallanceSuccess && parseInt(walletBalance.amount, 10)}
                </Text>
                <AiFillEye className="text-[30px]" />
              </div>
              <div className="mt-[30px] flex items-center gap-3">
                <Button
                  onClick={toggleModal}
                  className="flex items-center gap-3 rounded-3xl bg-[#FFFFFF] text-[#0A83FF]"
                >
                  <span>
                    <FaPlus />
                  </span>
                  Fund Wallet
                </Button>
                <div className="rounded-full bg-black p-3 text-xl text-white">
                  <SlOptions />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[345px] rounded-3xl border bg-[#FFFFFF] shadow-xl lg:w-[286px]">
            <div className=" my-[36px] pl-[40px] lg:pl-0">
              <div className="mb-3 max-h-[50px] max-w-[50px] rounded-2xl bg-[#CEE6FF] p-3 text-[28px] text-[#0A83FF] shadow-lg lg:mx-auto">
                <TbBuildingBank />
              </div>
              <Text className="text-[14px] text-[#667084] lg:mx-auto lg:text-center">
                Saving Plan
              </Text>
              <Text className="font-dmSansBold text-[30px] text-[#0A83FF] lg:text-center">
                {walletBallanceSuccess &&
                  parseInt(walletBalance.totalAmountSaved, 10)}
                <span className="font-dmSansMedium text-[16px] text-[#667084]">
                  /Month
                </span>
              </Text>
            </div>
          </div>
        </div>
        <div className="mt-[48px] lg:ml-[31px] lg:mt-[40px]">
          <div className="flex justify-between pr-5">
            <Heading type="h3">Upcoming Payment</Heading>
            <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
              view all
            </Text>
          </div>
          <div className="mx-auto max-w-[200px] content-center items-center justify-center py-10">
            <div className="mx-auto content-center items-center justify-items-center">
              <img
                src="/assets/images/dashboard/Illustration.png"
                alt="book a trip"
                className="mx-auto h-[100px] w-[124px]"
              />
              <Text className="mx-auto mb-5 mt-7 text-center text-[12px]">
                Sorry you don’t have any schedule at the moment
              </Text>
            </div>
          </div>
        </div>
        <div className="mt-[48px] lg:ml-[31px] lg:mt-[40px]">
          <div className="flex justify-between pr-5">
            <Heading type="h3">Transaction History</Heading>
            <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
              view all
            </Text>
          </div>
          <div>
            <DataTable columns={columns} data={data} />
          </div>
          <div className="mx-auto max-w-[200px] content-center items-center justify-center py-10">
            {data?.length < 0 && (
              <div className="mx-auto content-center items-center justify-items-center">
                <Text className="mx-auto mb-5 mt-7 text-center text-[12px]">
                  Sorry you don’t have any schedule at the moment
                </Text>
              </div>
            )}
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
                  <Heading type="h3">Fund Wallet</Heading>
                  <p
                    className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                    onClick={toggleModal}
                  >
                    X
                  </p>
                </div>
                <Input
                  label="Amount"
                  value={payload.amount}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    setPayload({ ...payload, amount: e.currentTarget.value })
                  }
                  placeholder="Enter Amount Here"
                />
                {trips && (
                  <Select
                    label="Trips"
                    onChange={(event) =>
                      setPayload({
                        ...payload,
                        trip: event.value,
                      })
                    }
                    placeholder="Select Trip"
                    value={payload.trip}
                    options={trips.map((option: any) => ({
                      value: option?.id,
                      label: option?.name,
                    }))}
                    showArrow
                  />
                )}
                {isSingleSuccess && payload.trip.length > 1 && (
                  <div className="px-2 py-4">
                    <div className="flex gap-3 rounded-xl bg-[#F9FAFB]">
                      <img
                        src={
                          singleTripData?.outingGallery?.[0]?.image ||
                          "/assets/images/icons/luggage1.png"
                        }
                        className="h-[65px] w-[65px] rounded-2xl"
                        alt={singleTripData.name}
                      />
                      <div>
                        <Heading type="h3">{singleTripData.name}</Heading>
                        <Text className="flex items-center gap-3 text-[12px] text-[#475467]">
                          <BsCalendarX className="text-[14px] text-[#0A83FF]" />
                          {formatedDate(
                            singleTripData.outingDate[0].startDate
                          )}{" "}
                          -{formatedDate2(singleTripData.outingDate[0].endDate)}
                        </Text>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-5 py-5">
                  <div className="flex h-[56px] items-center gap-4 rounded-2xl bg-[#FFF5EB]">
                    <span className="pl-5 text-[24px] text-[#FF860A]">
                      <TbCards />
                    </span>
                    <p className="cursor-pointer text-[15px] text-[#475467]">
                      Pay with Card
                    </p>
                  </div>
                  <div className="flex h-[56px] items-center gap-4 rounded-2xl bg-[#00C3F71A]">
                    <img
                      src="/assets/images/icons/paystack.png"
                      className="pl-5"
                      alt="paystack"
                    />
                    <p className="cursor-pointer" onClick={handleLinkSubmit}>
                      Pay with Paystack
                    </p>
                  </div>
                  <Button
                    className="cursor-pointer rounded-3xl text-[14px]"
                    onClick={handleLinkSubmit}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
