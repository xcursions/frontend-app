"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import Button from "@/components/lib/Button";
import Input from "@/components/lib/Input";
import { ArrowIcon } from "@/components/lib/Svg";
import { useCreateCustomTripsMutation } from "@/services/public";
import type { CustomTripPayload } from "@/services/public/payload";

const tripSchema = yup.object({
  toCountry: yup.string().required("This field is required"),
  numberOfPersons: yup
    .number()
    .positive()
    .min(1, "Number of persons must be at least 1")
    .required("This field is required"),
  otherDestinations: yup.string().required("This field is required"),
  specialOccasion: yup.string(),
  travelDates: yup.string().required("This field is required"),
  budgetPerPersonExcludingFlight: yup
    .number()
    .positive()
    .required("This field is required"),
  otherActivities: yup.string().required("This field is required"),
  notes: yup.string().required("This field is required"),
  referredFrom: yup.string(),
});

const ClientView = () => {
  const router = useRouter();
  const [createCustomTrip, { isLoading }] = useCreateCustomTripsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tripSchema),
    defaultValues: {
      numberOfPersons: 1,
    },
  });
  const onSubmit = (formValues: CustomTripPayload) => {
    const payload: CustomTripPayload = {
      toCountry: formValues.toCountry,
      numberOfPersons: formValues.numberOfPersons,
      otherDestinations: formValues.otherDestinations,
      travelDates: formValues.travelDates,
      budgetPerPersonExcludingFlight: formValues.budgetPerPersonExcludingFlight,
      otherActivities: formValues.otherActivities,
      notes: formValues.notes,
    };
    if (formValues.specialOccasion) {
      payload.specialOccasion = formValues.specialOccasion;
    }

    if (formValues.referredFrom) {
      payload.referredFrom = formValues.referredFrom;
    }
    createCustomTrip(payload)
      .unwrap()
      .then(() => {
        toast.success("Successfully submitted");
      })
      .catch(() => toast.error("An error occured"));
  };
  return (
    <div className="xcursions_custom_wrapper">
      <div className="xcursions_custom_lhs">
        <p
          onClick={router.back}
          className="flex w-[96px] cursor-pointer items-center rounded-[100px] border border-[#E4E7EC] px-[16px] py-[8px]"
        >
          <ArrowIcon />
          <span>Back</span>
        </p>
        <h1 className=" txt-24 fw-700">Custom Trip</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Where are you travelling to? 🌍"
            register={register("toCountry")}
            errorMsg={errors?.toCountry?.message}
          />
          <Input
            label="How many people are joining you on this adventure? 🧳"
            register={register("numberOfPersons")}
            errorMsg={errors.numberOfPersons?.message}
            type="number"
          />
          <Input
            label="Got any other places on your must-visit list?"
            register={register("otherDestinations")}
            errorMsg={errors.otherDestinations?.message}
          />
          <Input
            label="Celebrating something special? We'd love to hear! (optional)"
            register={register("specialOccasion")}
            errorMsg={errors.specialOccasion?.message}
          />
          <Input
            label="When do you plan to travel, and for how long? 📅"
            register={register("travelDates")}
            type="date"
            errorMsg={errors.travelDates?.message}
          />
          <Input
            label="What is your budget per traveler, excluding flights? 💰"
            register={register("budgetPerPersonExcludingFlight")}
            errorMsg={errors.budgetPerPersonExcludingFlight?.message}
          />
          <Input
            label="What kind of fun activities (tours) would you like us to include? 🌴"
            register={register("otherActivities")}
            errorMsg={errors.otherActivities?.message}
          />
          <Input
            label="Any other specific ideas or wishes for your trip? We're eager to hear them! 📝"
            register={register("notes")}
            errorMsg={errors.notes?.message}
          />
          <Input
            label="How did you find out about us? (optional)"
            register={register("referredFrom")}
            errorMsg={errors.referredFrom?.message}
          />
          <Button
            className=" mt-4 h-[40px] w-full"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </div>
      <div className="xcursions_custom_rhs">
        <Image
          src="/assets/images/custom.png"
          width={500}
          height={700}
          alt="custom trip"
        />
        <section>
          <h3 className=" txt-18 fw-700 mt-5">Frequently Asked Questions</h3>
          <div className="mt-4">
            <h4 className=" txt-14 fw-500">
              <span className=" text-[#0A83FF]">Q. </span>What type of travel
              packages do you offer?
            </h4>
            <p className=" txt-14 fw-400 mt-2 text-[#475467]">
              We offer a wide range of travel packages including adventure
              tours, cultural tours, beach vacations, city breaks, and more.
            </p>
          </div>
          <div className="mt-4">
            <h4 className=" txt-14 fw-500">
              <span className=" text-[#0A83FF]">Q. </span>Do you offer travel
              insurance?
            </h4>
            <p className=" txt-14 fw-400 mt-2 text-[#475467]">
              Yes, we offer travel insurance that covers a range of situations
              including trip cancellation, medical emergencies, lost luggage,
              and more.
            </p>
          </div>
          <div className="mt-4">
            <h4 className=" txt-14 fw-500">
              <span className=" text-[#0A83FF]">Q. </span>What if I need to
              cancel my booking?
            </h4>
            <p className=" txt-14 fw-400 mt-2 text-[#475467]">
              If you need to cancel your booking, simply contact our customer
              service team, and we&apos;ll assist you with the cancellation
              process. Please note that cancellation fees may apply depending on
              the terms and conditions of your booking.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClientView;
