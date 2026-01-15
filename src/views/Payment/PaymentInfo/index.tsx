"use client";

import type { FormEvent } from "react";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import Button from "@/components/lib/Button";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import {
  useCreatePaymentCardMutation,
  useCreatePaymentCardOtpMutation,
  useCreatePaymentCardPinMutation,
  useDeletePaymentCardsMutation,
  useGetPaymentCardsQuery,
} from "@/services/user";

import styles from "./Payment.module.scss";

const initialState = {
  nameOnCard: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
  otp: "",
  pin: "",
  reference: "",
  default: true,
};
type Card = {
  id: string;
  cardNumber: string;
  nameOnCard: string;
};
const PaymentInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPin, setIsPin] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const { data: paymentCards, isSuccess: paymentCardsSuccess } =
    useGetPaymentCardsQuery();
  const [AddCard, { isSuccess, isError, error, isLoading, data }] =
    useCreatePaymentCardMutation();
  const [
    submitPin,
    { data: pinData, isLoading: pinLoading, isSuccess: pinSuccess },
  ] = useCreatePaymentCardPinMutation();
  const [submitOtp, { isSuccess: otpSuccess, isLoading: otpLoading }] =
    useCreatePaymentCardOtpMutation();
  const [
    deleteCard,
    { isSuccess: deleteSuccess, isError: isDeleteError, error: deleteError },
  ] = useDeletePaymentCardsMutation();

  useErrorHandler({
    isError,
    error,
  });
  useErrorHandler({
    isError: isDeleteError,
    error: deleteError,
  });
  useSuccessHandler({
    isSuccess,
    successFunction: () => {
      setIsPin(true);
      setIsOpen(false);
      setPayload({ ...payload, reference: data?.initialReference });
    },
    toastMessage: "Card added successfully",
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
    toastMessage: "Successful",
  });
  useSuccessHandler({
    isSuccess: deleteSuccess,
    toastMessage: "Card removed successfully",
  });
  const toggleModal = () => {
    setIsOpen(!isOpen);
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
  const handleCardSubmit = () => {
    AddCard({
      nameOnCard: payload.nameOnCard,
      cardNumber: payload.cardNumber,
      expiryMonth: payload.expiryMonth,
      expiryYear: payload.expiryYear,
      cvv: payload.cvv,
      default: payload.default,
    });
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
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Heading type="h1" className="ml-[24px] py-4 text-[18px] lg:ml-[45px]">
          Manage Payment
        </Heading>
      </div>
      <div className={styles.wrapper}>
        <Button onClick={toggleModal}>Add Payment Card</Button>
        {paymentCardsSuccess && paymentCards.length > 0 ? (
          <div className="mt-5">
            <Heading type="h3" className="text-[13px] text-[#101828]">
              Edit Card Details
            </Heading>
            <div className="mt-[10px] lg:my-[24px]">
              {paymentCardsSuccess &&
                paymentCards.map((res: Card) => (
                  <div
                    key={res.id}
                    className="mr-5 flex items-center justify-between rounded-2xl border px-2 py-1 shadow-sm"
                  >
                    <div className="flex items-center gap-[13px] lg:gap-[23px]">
                      <img
                        src="/assets/images/user/master_card.png"
                        alt="card"
                        className="h-[40px] w-[40px] rounded-full lg:h-[68px] lg:w-[68px]"
                      />
                      <div className="flex flex-col">
                        <p className="text-[14px] font-semibold text-[#101828]">
                          {res.cardNumber}
                        </p>
                        <p className="font-dmSansRegular text-[14px] text-[#667084]">
                          {res.nameOnCard}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div
                        className={`flex cursor-pointer gap-3 text-[20px] font-medium text-[#0A83FF]`}
                      >
                        <FiEdit />
                        <span className="hidden text-[14px] lg:block">
                          Edit
                        </span>
                      </div>
                      <div
                        className={`flex cursor-pointer gap-3 text-[20px] font-medium text-[#F04438]`}
                        onClick={() => deleteCard(res.id)}
                      >
                        <RiDeleteBin6Line />
                        <span className="hidden text-[14px] lg:block">
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <Heading type="h2" className="mx-auto text-center text-[16px]">
              No Card Added
            </Heading>
          </div>
        )}
      </div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
            onClick={toggleModal}
          ></div>
          <div className="fixed inset-0 z-[32] flex w-[326px] items-center justify-center lg:left-[550px] lg:w-[418px]">
            <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
              <div className="flex justify-between">
                <Heading type="h3">Card Details</Heading>
                <p
                  className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                  onClick={toggleModal}
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
                loading={isLoading}
              >
                Add Card
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
  );
};

export default PaymentInfo;
