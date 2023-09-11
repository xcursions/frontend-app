"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
// import { TbBuildingBank, TbCards } from "react-icons/tb";
import { TbCards } from "react-icons/tb";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import Text from "@/components/lib/Text/Text";
import UpcomingPaymentCard from "@/components/lib/UpcomingPaymentCard/UpcomingPaymentCard";
import { DataTable } from "@/components/ui/data-table";
import { useSuccessHandler } from "@/hooks";
import {
  useGetTransactionsQuery,
  useGetWalletBalanceQuery,
  useInitiateCardDepositMutation,
  useInitiateLinkDepositMutation,
  useSubmitCardOtpMutation,
  useSubmitCardPinMutation,
} from "@/services/user";
import { useGetUpcomingPaymentQuery } from "@/services/user/savingPlan";

import { columns } from "./services/Colums";
import styles from "./wallet.module.scss";

const initialState = {
  trip: "",
  amount: 0,
  nameOnCard: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
  pin: "",
  reference: "",
  otp: "",
};

const Wallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentChannel, setPaymentChannel] = useState<"link" | "card" | "">(
    ""
  );
  const [isCard, setIsCard] = useState(false);
  const [isPin, setIsPin] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [payload, setPayload] = useState(initialState);

  const { data: walletBalance, isSuccess: walletBallanceSuccess } =
    useGetWalletBalanceQuery();
  const { data: upcomingPayment, isSuccess: upcomingPaymentSuccess } =
    useGetUpcomingPaymentQuery();
  const { data: transactionHistory, isSuccess: transactionHistorySuccess } =
    useGetTransactionsQuery("?limit=5");
  const [initiateLinkDeposit, { data: linkDeposit, isSuccess: linkSuccess }] =
    useInitiateLinkDepositMutation();
  const [
    initiateCardDeposit,
    { data: cardDeposit, isLoading: cardLoading, isSuccess: cardSuccess },
  ] = useInitiateCardDepositMutation();
  const [
    submitPin,
    { data: pinData, isLoading: pinLoading, isSuccess: pinSuccess },
  ] = useSubmitCardPinMutation();
  const [submitOtp, { isSuccess: otpSuccess, isLoading: otpLoading }] =
    useSubmitCardOtpMutation();

  useSuccessHandler({
    isSuccess: linkSuccess,
    showToast: true,
    successFunction: () => {
      window.open(linkDeposit?.depositLink, "_blank");
    },
  });
  useSuccessHandler({
    isSuccess: pinSuccess,
    showToast: true,
    successFunction: () => {
      setIsPin(false);
      setIsOtp(true);
      setPayload({ ...payload, reference: pinData.transaction.reference });
    },
    toastMessage: "Please enter Otp",
  });
  useSuccessHandler({
    isSuccess: otpSuccess,
    showToast: true,
    successFunction: () => {
      setIsOtp(false);
    },
    toastMessage: "Deposit Completed Successfully",
  });
  useSuccessHandler({
    isSuccess: cardSuccess,
    showToast: true,
    successFunction: () => {
      setIsPin(true);
      setIsCard(false);
      setIsOpen(false);
      setPayload({ ...payload, reference: cardDeposit.transaction.reference });
    },
    toastMessage: "Please enter card pin",
  });
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleCardModal = () => {
    setIsCard(!isCard);
    setIsOpen(!isOpen);
  };
  const handleLinkSubmit = () => {
    if (payload.amount > 0) {
      initiateLinkDeposit({
        amount: payload.amount,
        callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/user/wallet`,
      });
    }
  };
  const handlePinSubmit = () => {
    if (payload.pin.length > 0) {
      submitPin({ pin: payload.pin, reference: payload.reference });
    }
  };
  const handleOtpSubmit = () => {
    if (payload.otp.length > 0) {
      submitOtp({ otp: payload.otp, reference: payload.reference });
    }
  };
  const handleCardSubmit = () => {
    if (payload.amount > 0) {
      initiateCardDeposit({
        amount: payload.amount,
        nameOnCard: payload.nameOnCard,
        cardNumber: payload.cardNumber,
        expiryMonth: payload.expiryMonth,
        expiryYear: payload.expiryYear,
        cvv: payload.cvv,
      });
    }
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const dateObj = new Date(selectedDate);
    const selectedMonth = dateObj.toLocaleString("default", {
      month: "2-digit",
    });
    const selectedYear = String(dateObj.getFullYear()).slice(-2);
    setPayload({
      ...payload,
      expiryYear: selectedYear,
      expiryMonth: selectedMonth,
    });
  };
  const data =
    transactionHistorySuccess &&
    transactionHistory.result.map((res: any) => {
      return {
        amount: res.transaction.amount,
        status: res.transaction.status,
        id: res.transaction.id,
        createdAt: res.transaction.createdAt.split("T")[0],
      };
    });
  const handleSubmitChecker = () => {
    if (paymentChannel === "link") {
      handleLinkSubmit();
    } else if (paymentChannel === "card") {
      toggleCardModal();
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Heading className="pl-3 pt-[40px] font-dmSansBold text-[24px] text-[#101828] lg:pl-[31px]">
          Wallet
        </Heading>
        <Text className="pl-3 text-[14px] text-[#667084] lg:pl-[31px] lg:text-[16px]">
          Welcome back to your dashboard
        </Text>
        <div className={styles.card_container}>
          <div className={styles.horizontal_div}>
            <div className=" absolute z-50 mx-auto items-center pb-[31px] pl-[40px] pt-[33px]">
              <Text className="text-[14px] text-[#FFFFFF] lg:text-[16px]">
                Total balance
              </Text>
              <div className="mt-[8px] flex items-center gap-3">
                <Text className="text-[24px]  text-[#FFFFFF] lg:text-[30px]">
                  ₦
                  {walletBallanceSuccess &&
                    parseInt(walletBalance.amount, 10).toLocaleString()}
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
          {/* <div className="w-[345px] rounded-3xl border bg-[#FFFFFF] shadow-xl lg:w-[286px]">
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
          </div> */}
        </div>
        <div className="mt-[48px] lg:ml-[31px] lg:mt-[40px]">
          <div className="flex justify-between px-5">
            <Heading type="h3">Upcoming Payment</Heading>
            <Link href="/user/wallet/saving-plan">
              <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
                view all
              </Text>
            </Link>
          </div>
          {upcomingPaymentSuccess && upcomingPayment.result.length > 0 ? (
            <div className=" mx-auto flex flex-col gap-[24px] px-3 lg:flex-row">
              {upcomingPayment.result.slice(0, 2).map((res: any) => (
                <div className="my-[24px]" key={res.id}>
                  <UpcomingPaymentCard detailsData={res} />
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
        <div className="mt-[48px] lg:ml-[31px] lg:mt-[40px]">
          <div className="flex justify-between px-5">
            <Heading type="h3">Transaction History</Heading>
            <Link href="/user/wallet/history">
              <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
                view all
              </Text>
            </Link>
          </div>
          <div className="mr-2 px-3">
            <DataTable columns={columns} data={data} />
          </div>
          <div className="mx-auto max-w-[200px] content-center items-center justify-center py-10">
            {data?.length < 1 && (
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
                  type="number"
                  value={payload.amount}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    setPayload({
                      ...payload,
                      amount: parseFloat(e.currentTarget.value),
                    })
                  }
                  placeholder="Enter Amount Here"
                />
                <span className="text-[12px] text-[#F04438]">
                  Minimum Amount ₦1000
                </span>
                <div className="flex flex-col gap-5 py-5">
                  <div
                    className={`${
                      paymentChannel === "card" && "border shadow-lg"
                    } flex h-[56px] cursor-pointer items-center gap-4 rounded-2xl bg-[#FFF5EB]`}
                    onClick={() => setPaymentChannel("card")}
                  >
                    <span className="pl-5 text-[24px] text-[#FF860A]">
                      <TbCards />
                    </span>
                    <p className="cursor-pointer text-[15px] text-[#475467]">
                      Pay with Card
                    </p>
                  </div>
                  <div
                    className={`${
                      paymentChannel === "link" && "border shadow-lg"
                    } flex h-[56px] cursor-pointer items-center gap-4 rounded-2xl bg-[#00C3F71A]`}
                    onClick={() => setPaymentChannel("link")}
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
                    disabled={
                      payload.amount <= 0 || !payload.amount || !paymentChannel
                    }
                    onClick={handleSubmitChecker}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        {isCard && (
          <>
            <div
              className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
              onClick={toggleCardModal}
            ></div>
            <div className="fixed inset-0 z-[32] flex w-[326px] items-center justify-center lg:left-[510px] lg:w-[418px]">
              <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                <div className="flex justify-between">
                  <Heading type="h3">Fund With Card</Heading>
                  <p
                    className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                    onClick={toggleCardModal}
                  >
                    X
                  </p>
                </div>
                <Input
                  label="Name on Card"
                  placeholder="Enter Card Name"
                  value={payload.nameOnCard}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    setPayload({
                      ...payload,
                      nameOnCard: e.currentTarget.value,
                    })
                  }
                />
                <Input
                  label="Card Number"
                  placeholder="Enter Card Number here"
                  value={payload.cardNumber}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    setPayload({
                      ...payload,
                      cardNumber: e.currentTarget.value,
                    })
                  }
                />
                <Input
                  type="date"
                  label="Expiry Date"
                  placeholder="Select Card Expiry Date"
                  onChange={handleDateChange}
                />
                <Input
                  label="CVV"
                  placeholder="Enter the 3 digit number on the back of your card"
                  value={payload.cvv}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    setPayload({
                      ...payload,
                      cvv: e.currentTarget.value,
                    })
                  }
                />
                <Button
                  className="my-3 w-full cursor-pointer rounded-3xl text-[14px]"
                  onClick={handleCardSubmit}
                  loading={cardLoading}
                >
                  Fund Wallet
                </Button>
              </div>
            </div>
          </>
        )}
        {isPin && (
          <>
            <div className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"></div>
            <div className="fixed inset-0 z-[32] flex w-[326px] items-center justify-center lg:left-[510px] lg:w-[418px]">
              <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                <div className="flex justify-between">
                  <Heading type="h3">Enter Pin</Heading>
                  <p
                    className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                    onClick={() => setIsPin(false)}
                  >
                    X
                  </p>
                </div>
                <Input
                  label="Card Pin"
                  placeholder="Enter Card Pin"
                  value={payload.pin}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    setPayload({
                      ...payload,
                      pin: e.currentTarget.value,
                    })
                  }
                />
                <Button
                  className="my-3 w-full cursor-pointer rounded-3xl text-[14px]"
                  onClick={handlePinSubmit}
                  loading={pinLoading}
                >
                  Submit Pin
                </Button>
              </div>
            </div>
          </>
        )}
        {isOtp && (
          <>
            <div className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"></div>
            <div className="fixed inset-0 z-[32] flex w-[326px] items-center justify-center lg:left-[510px] lg:w-[418px]">
              <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                <div className="flex justify-between">
                  <Heading type="h3">Enter Otp</Heading>
                  <p
                    className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                    onClick={() => setIsOtp(false)}
                  >
                    X
                  </p>
                </div>
                <Input
                  label="Otp"
                  placeholder="Enter Otp"
                  value={payload.otp}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    setPayload({
                      ...payload,
                      otp: e.currentTarget.value,
                    })
                  }
                />
                <Button
                  className="my-3 w-full cursor-pointer rounded-3xl text-[14px]"
                  onClick={handleOtpSubmit}
                  loading={otpLoading}
                >
                  Submit Otp
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
