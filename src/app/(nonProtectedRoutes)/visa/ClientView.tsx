"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import Button from "@/components/lib/Button";
import Checkbox from "@/components/lib/Checkbox";
import Input from "@/components/lib/Input";
import Select from "@/components/lib/Select";
import { ArrowIcon } from "@/components/lib/Svg";
import { useCreateVisaApplicationMutation } from "@/services/public";
import Heading from "@/components/lib/Heading";
import { TbCards } from "react-icons/tb";
import { type VisaApplicationPayload } from "@/services/public/payload";

const visaSchema = yup.object({
  visaCountry: yup.string().required("This field is required"),
  nationality: yup.string().required("password is required"),
  hasPassport: yup.boolean().required(),
  firstName: yup.string().required("first name is required"),
  lastName: yup.string().required("last name is required"),
  email: yup.string().required("email is required"),
  phoneNumber: yup.string().required("phone number is required"),
  maritalStatus: yup.string().required("marital status is required"),
  dateOfBirth: yup.string().required("date of birth is required"),
  travelHistory: yup.string(),
  channel: yup.string().oneOf(["wallet", "paystack", ""]).required(),
  callbackUrl: yup.string().required("callback url is required"),
});

const marritalOption = [
  { value: "married", label: "Married" },
  { value: "single", label: "Single" },
];

const ClientView = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentChannel, setPaymentChannel] = useState<
    "wallet" | "paystack" | ""
  >("");

  const router = useRouter();
  const [createVisa] = useCreateVisaApplicationMutation();

  const onSubmit = (formValues: VisaApplicationPayload) => {
    setLoading(true);
    if (paymentChannel === "wallet") {
      createVisa(formValues)
        .unwrap()
        .then(() => router.push("/payment-success"))
        .catch((err) =>
          toast.error(err?.data?.meta?.message ?? "An Error Occured")
        );
    } else {
      createVisa(formValues)
        .unwrap()
        .then((data) => {
          if (data?.depositLink) {
            router.push(data?.depositLink);
          }
        })
        .catch((err) =>
          toast.error(err?.data?.meta?.message ?? "An Error Occured")
        );
    }
    setLoading(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(visaSchema),
    defaultValues: {
      hasPassport: false,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success`,
    },
  });

  const currentState = watch();

  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="xcursions_visa_wrapper">
      <div className="xcursions_visa_lhs">
        <p
          onClick={router.back}
          className="flex w-[96px] cursor-pointer items-center rounded-[100px] border border-[#E4E7EC] px-[16px] py-[8px]"
        >
          <ArrowIcon />
          <span>Back</span>
        </p>
        <h1 className=" txt-24 fw-700">Start Visa Application</h1>
        <form>
          <section className="flex flex-col gap-2 lg:flex-row">
            <Input
              label="Country you need visa for"
              placeholder="Country of visa"
              className="w-full min-w-[252px]"
              register={register("visaCountry")}
              errorMsg={errors.visaCountry?.message}
            />
            <Input
              label="Nationality"
              placeholder="Nationality"
              className="w-full min-w-[252px]"
              register={register("nationality")}
              errorMsg={errors.nationality?.message}
            />
          </section>
          <div className="mt-10">
            <section className="flex w-fit items-center justify-center gap-2">
              <p className=" txt-14 inline-block w-full text-center">
                Do you have a passport
              </p>
              <div className="flex w-fit gap-2">
                <Checkbox
                  type="radio"
                  label="No"
                  id="passport"
                  checked={!currentState.hasPassport}
                  onClick={() => setValue("hasPassport", false)}
                />
                <Checkbox
                  type="radio"
                  label="Yes"
                  id="passports"
                  checked={currentState.hasPassport}
                  onClick={() => setValue("hasPassport", true)}
                />
              </div>
            </section>
            <section className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <Input
                label="First Name"
                placeholder="John"
                className="w-full min-w-[252px]"
                register={register("firstName")}
                errorMsg={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                className="w-full min-w-[252px]"
                register={register("lastName")}
                errorMsg={errors.lastName?.message}
              />
              <Input
                label="Email Address"
                placeholder="xxx@gmail.com"
                className="w-full min-w-[252px]"
                register={register("email")}
                errorMsg={errors.email?.message}
              />
              <Input
                label="Phone Number"
                placeholder="090---"
                className="w-full min-w-[252px]"
                register={register("phoneNumber")}
                errorMsg={errors.phoneNumber?.message}
              />
              <Select
                placeholder="Select Marital Status"
                label="Marital Status"
                options={marritalOption.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                showArrow
                className="w-full min-w-[252px]"
                onChange={(e) => setValue("maritalStatus", e.value)}
                error={!!errors.maritalStatus?.message}
              />
              <Input
                type="date"
                label="Date of Birth"
                register={register("dateOfBirth")}
                errorMsg={errors.dateOfBirth?.message}
              />
            </section>
            <Input
              label="Travel history in the last 5 years"
              className="w-full"
              register={register("travelHistory")}
              errorMsg={errors.travelHistory?.message}
            />
            <p className=" txt-14 fw-400 mt-2">
              By clicking the continue , I confirm that I have read the Terms
              and Conditions . I also confirm that the informations provided are
              accurate.
            </p>
            <Button
              className=" mt-4 h-[40px] w-full"
              type="button"
              onClick={openModal}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden md:block">
        <Image
          src="/assets/images/verify.png"
          alt="Visa"
          width={330}
          height={410}
          className="max-h-[430px] w-full min-w-[320px] max-w-[360px] rounded-md object-cover"
        />
      </div>
      {/** Popup modal */}
      {isOpen && (
        <div className="modal">
          <div className="modal_content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className=" flex flex-col items-center justify-center gap-3 pt-4 text-center md:pt-2">
              <Image
                src="/assets/images/icons/passport.png"
                alt="visa image"
                width={100}
                height={100}
              />

              <p className=" txt-16 fw-500 text-[#101828]">
                Complete your visa enquiry process by booking a 30 minute
                consultation with an expert!
              </p>
              <p className=" txt-14 fw-400 text-[#475467]">
                You will be charged{" "}
                <span className=" text-[#0A83FF]">₦5,000</span> for this
                service. This will be deducted from your visa application fee.
              </p>
              <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                <div className="flex justify-between">
                  <Heading type="h3" className="text-[18px] text-[#101828]">
                    Select Payment Method
                  </Heading>
                </div>
                <div className="flex flex-col gap-5 py-5">
                  <div
                    className={`${
                      paymentChannel === "wallet" && "border shadow-lg"
                    } flex h-[56px] cursor-pointer items-center gap-4 rounded-2xl bg-[#FFF5EB]`}
                    onClick={() => {
                      setValue("channel", "wallet");
                      setPaymentChannel("wallet");
                    }}
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
                    onClick={() => {
                      setValue("channel", "paystack");
                      setPaymentChannel("paystack");
                    }}
                  >
                    <img
                      src="/assets/images/icons/paystack.png"
                      className="pl-5"
                      alt="paystack"
                    />
                    <p className="cursor-pointer">Pay with Paystack</p>
                  </div>
                  <Button
                    className=" txt-14 fw-400 h-[40px] w-full rounded-[10000px]"
                    onClick={handleSubmit(onSubmit)}
                    loading={loading}
                    disabled={!paymentChannel}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientView;
