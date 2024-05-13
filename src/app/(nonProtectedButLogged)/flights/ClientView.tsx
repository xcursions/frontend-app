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
import { useCreateFlightBookingMutation } from "@/services/user/savingPlan";

const visaSchema = yup.object({
  numOfAdults: yup.string(),
  numOfChildren: yup.string(),
  numOfInfants: yup.string(),
  type: yup.string(),
  class: yup.string().required("This field is required"),
  travelFrom: yup.string().required("This field is required"),
  travelTo: yup.string().required("This field is required"),
  departureDate: yup.string().required("This field is required"),
  arrivalDate: yup.string(),
});

const price = [
  { value: "0", label: 0 },
  { value: "1", label: 1 },
  { value: "2", label: 2 },
  { value: "3", label: 3 },
  { value: "4", label: 4 },
  { value: "5", label: 5 },
];
const flightClass = [
  { value: "economy", label: " Economy" },
  { value: "premium-economy", label: " Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];

const ClientView = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [createFlight] = useCreateFlightBookingMutation();

  const onSubmit = (formValues: any) => {
    setLoading(true);
    createFlight(formValues)
      .unwrap()
      .then(() => toast.success("Successful"))
      .catch(() => toast.error("An Error Occured"));
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
      type: "round-trip",
    },
  });
  const currentState = watch();
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
        <h1 className=" txt-24 fw-700">Book Flight</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="mb-3 flex w-fit items-center justify-center gap-2">
            <p className=" txt-14 inline-block w-full text-center">
              Select Flight Type
            </p>
            <div className="flex w-fit gap-2">
              <Checkbox
                type="radio"
                label="One Way"
                id="passport"
                checked={currentState.type === "one-way"}
                labelClassname=" flex text-center w-fit"
                defaultChecked={currentState.type === "round-trip"}
                onClick={() => setValue("type", "one-way")}
              />
              <Checkbox
                type="radio"
                label="Round Trip"
                id="passports"
                checked={currentState.type === "round-trip"}
                defaultChecked={currentState.type === "round-trip"}
                labelClassname=" flex text-center w-fit"
                onClick={() => setValue("type", "round-trip")}
              />
            </div>
          </section>
          <Input
            label="Travel from"
            placeholder="Maldives"
            icon={"/assets/images/icons/map.png"}
            className="w-full"
            register={register("travelFrom")}
            errorMsg={errors.travelFrom?.message}
          />
          <Input
            label="Travel to"
            placeholder="Maldives"
            icon={"/assets/images/icons/map.png"}
            className="w-full"
            register={register("travelTo")}
            errorMsg={errors.travelTo?.message}
          />
          <div className="mt-5">
            <section className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <Input
                type="date"
                label="Departure date"
                register={register("departureDate")}
                errorMsg={errors.departureDate?.message}
              />
              <Input
                type="date"
                label="Arrival date"
                register={register("arrivalDate")}
                errorMsg={errors.arrivalDate?.message}
              />
              <Select
                placeholder={"No of tickets"}
                label="Adult"
                startIcon={"/assets/images/user/user.png"}
                onChange={(e) => setValue("numOfAdults", e.value)}
                options={price.map((option) => ({
                  value: option.value,
                  label: `${option.label} Adult`,
                }))}
                showArrow
                error={!!errors.numOfAdults?.message}
              />
              <Select
                placeholder={"No of tickets"}
                label="Children"
                startIcon={"/assets/images/user/user.png"}
                onChange={(e) => setValue("numOfChildren", e.value)}
                options={price.map((option) => ({
                  value: option.value,
                  label: `${option.label} Child`,
                }))}
                showArrow
                error={!!errors.numOfChildren?.message}
              />
              <Select
                placeholder={"No of tickets"}
                label="Infant"
                startIcon={"/assets/images/user/user.png"}
                onChange={(e) => setValue("numOfInfants", e.value)}
                options={price.map((option) => ({
                  value: option.value,
                  label: `${option.label} Infants`,
                }))}
                showArrow
                error={!!errors.numOfInfants?.message}
              />
              <Select
                placeholder={"Class"}
                label="Select Class"
                startIcon={"/assets/images/user/briefcase.png"}
                onChange={(e) => setValue("class", e.value)}
                options={flightClass.map((option) => ({
                  value: option.value,
                  label: `${option.label} Class`,
                }))}
                showArrow
                error={!!errors.class?.message}
              />
            </section>
            <Button
              className=" mt-6 h-[40px] w-full rounded-3xl "
              type="submit"
              loading={loading}
            >
              Book Now
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden md:block">
        <Image
          src="/assets/images/flight.png"
          alt="Visa"
          width={330}
          height={410}
          className="max-h-[430px] w-full min-w-[320px] max-w-[360px] rounded-md object-cover"
        />
      </div>
    </div>
  );
};

export default ClientView;
// onSubmit={handleSubmit(onSubmit)}
