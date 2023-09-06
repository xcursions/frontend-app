"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TbFileUpload } from "react-icons/tb";

import Layout from "@/components/admin/layout/Layout";
import Button from "@/components/lib/Button/Button";
import FullPageLoader from "@/components/lib/FullPageLoader";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input";
import Text from "@/components/lib/Text";
import useErrorHandler from "@/hooks/useErrorHandler";
import useSuccessHandler from "@/hooks/useSuccessHandler";
import {
  useCreateOutingDestinationMutation,
  useCreateOutingImageMutation,
  useCreateOutingMutation,
  useCreateOutingPickupMutation,
} from "@/services/admin";

import styles from "./Profile.module.scss";

const initialState = {
  name: "",
  description: "",
  currency: "",
  price: "",
  type: "",
  subType: "",
  startDate: "",
  endDate: "",
  deadlineGap: "",
};
const initialDestinationState = {
  city: "",
  country: "",
  continent: "",
  location: "",
};

const Page = () => {
  const [outings, setOutings] = useState(initialState);
  const [outingDestination, setOutingDestination] = useState(
    initialDestinationState
  );
  const [id, setId] = useState("1205df20-4fdb-4f3c-8438-f70217fd8a86");
  const [file, setFile] = useState<File | null>(null);
  const [uploadImage, { isLoading, isError, error }] =
    useCreateOutingImageMutation();
  const [
    uploadDestination,
    {
      isLoading: destinationLoading,
      isSuccess: destinationSuccess,
      isError: isDestinationError,
      error: destinationError,
    },
  ] = useCreateOutingDestinationMutation();
  const [
    uploadPickup,
    {
      isLoading: pickupLoading,
      isSuccess: pickupSuccess,
      isError: ispickupError,
      error: pickupError,
    },
  ] = useCreateOutingPickupMutation();
  const [
    uploadOuting,
    {
      data: outingsData,
      isLoading: profileLoading,
      isSuccess: profileSuccess,
      isError: isProfileError,
      error: profileError,
    },
  ] = useCreateOutingMutation();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles) {
      const newFile = acceptedFiles[0];

      if (newFile) {
        setFile(newFile);
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOutings({ ...outings, [event.target.name]: event.target.value });
  };
  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOutingDestination({
      ...outingDestination,
      [event.target.name]: event.target.value,
    });
  };
  const handleUploadImage = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file as File);
      formData.append("type", "image");
      formData.append("featured", "true");
      uploadImage({
        query: id,
        data: formData,
      });
      setFile(null);
    }
  };
  const handleProfileSubmit = () => {
    uploadOuting(outings);
  };
  useErrorHandler({
    isError,
    error,
  });
  useErrorHandler({
    isError: isProfileError,
    error: profileError,
  });
  useErrorHandler({
    isError: isDestinationError,
    error: destinationError,
  });
  useErrorHandler({
    isError: ispickupError,
    error: pickupError,
  });
  useSuccessHandler({
    isSuccess: profileSuccess,
    successFunction: () => {
      setId(outingsData?.id);
      setOutings(initialState);
    },
    toastMessage: "Outing Created successfully!",
  });
  useSuccessHandler({
    isSuccess: destinationSuccess,
    successFunction: () => {
      setOutingDestination(initialDestinationState);
    },
    toastMessage: "Destination Created successfully!",
  });
  useSuccessHandler({
    isSuccess: pickupSuccess,
    successFunction: () => {
      setOutingDestination(initialDestinationState);
    },
    toastMessage: "Pickup Created successfully!",
  });
  const handleDestinationSubmit = () => {
    uploadDestination({ query: id, data: outingDestination });
  };
  const handlePickupSubmit = () => {
    uploadPickup({ query: id, data: outingDestination });
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>
          <Heading type="h1" className="ml-5 py-4 text-[18px]">
            Edit Profile
          </Heading>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.profileCard}>
            <div className="w-full p-3 lg:w-[142px]">
              <Text className="font-dmSansBold text-[14px]">
                Profile Picture
              </Text>
              {file ? (
                <figure className={styles.container}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className={styles.image}
                  />
                </figure>
              ) : (
                <div className={styles.dropzone} {...getRootProps()}>
                  <input
                    {...getInputProps()}
                    accept="image/*"
                    multiple={false}
                  />

                  <TbFileUpload className="text-3xl" />

                  {isDragActive ? (
                    <Text className="font-dmSansBold">
                      Drop your image here!
                    </Text>
                  ) : (
                    <>
                      <Text className="text-[10px] font-light">
                        We recommend an image of at least 400x400. Supports jpg,
                        png and gif
                      </Text>
                    </>
                  )}
                </div>
              )}

              <Button
                className="mt-5 rounded-2xl bg-gray-300 text-[14px] text-[#667084]"
                onClick={handleUploadImage}
                loading={isLoading}
              >
                Upload
              </Button>
            </div>
          </div>
          <div className={styles.profileForm}>
            <Text className="text-[15px] font-bold">Outing INFO</Text>
            <Input
              placeholder="Outing Name"
              label="name"
              name="name"
              value={outings.name}
              onChange={handleChange}
            />
            <Input
              placeholder="Outing Description"
              label="Description"
              name="description"
              value={outings.description}
              onChange={handleChange}
            />
            <Input
              placeholder="Enter Amount"
              label="Amount"
              name="price"
              value={outings.price}
              onChange={handleChange}
            />
            <Input
              placeholder="Enter Currency eg NGN"
              label="Currency"
              name="currency"
              value={outings.currency}
              onChange={handleChange}
            />
            <Input
              placeholder="event or tour"
              label="Type"
              name="type"
              value={outings.type}
              onChange={handleChange}
            />
            <Input
              placeholder="Private or group"
              label="SubType"
              name="subType"
              value={outings.subType}
              onChange={handleChange}
            />
            <Input
              placeholder="2023-09-1"
              label="Start Date"
              name="startDate"
              value={outings.startDate}
              onChange={handleChange}
            />
            <Input
              placeholder="2023-12-15"
              label="End Date"
              name="endDate"
              value={outings.endDate}
              onChange={handleChange}
            />
            <Input
              placeholder="limit to collect payment"
              label="Deadline"
              name="deadlineGap"
              value={outings.deadlineGap}
              onChange={handleChange}
            />
            <Button
              className="mt-5 w-full rounded-3xl bg-[#0A83FF]"
              onClick={handleProfileSubmit}
            >
              Update Profile
            </Button>
            {profileLoading && <FullPageLoader />}
          </div>
          <div className="py-5 lg:py-10">
            <Text className="text-[15px] font-bold">Update Destination</Text>
            <Input
              label="Destination"
              placeholder="City"
              name="city"
              value={outingDestination.city}
              onChange={handleDestinationChange}
            />
            <Input
              label="Continent"
              name="continent"
              placeholder="Continent"
              value={outingDestination.continent}
              onChange={handleDestinationChange}
            />
            <Input
              label="country"
              placeholder="country"
              name="country"
              value={outingDestination.country}
              onChange={handleDestinationChange}
            />
            <Input
              label="location"
              placeholder="location"
              name="location"
              value={outingDestination.location}
              onChange={handleDestinationChange}
            />
            <Button
              className="mt-5 w-full rounded-3xl bg-[#0A83FF]"
              onClick={handleDestinationSubmit}
            >
              Update Destination
            </Button>
            <Button
              className="mt-5 w-full rounded-3xl bg-[#0A83FF]"
              onClick={handlePickupSubmit}
            >
              Update Pickup
            </Button>
            {pickupLoading && <FullPageLoader />}
            {destinationLoading && <FullPageLoader />}
          </div>
        </div>
        {isLoading && <FullPageLoader />}
      </div>
    </Layout>
  );
};

export default Page;
