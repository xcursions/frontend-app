// @ts-nocheck

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbFileUpload } from "react-icons/tb";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import Text from "@/components/lib/Text/Text";
import TextArea from "@/components/lib/TextArea/TextArea";
import Addon from "@/components/trips/Addon/Addon";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import useErrorHandler from "@/hooks/useErrorHandler";
import useSuccessHandler from "@/hooks/useSuccessHandler";
import {
  useCreateChargePlanMutation,
  useCreateOutingAddonIconMutation,
  useCreateOutingAddonMutation,
  useCreateOutingDestinationMutation,
  useCreateOutingImageMutation,
  useCreateOutingPickupMutation,
  useCreateReviewMutation,
  useGetOutingAddonsQuery,
  useGetOutingsQuery,
  useGetReviewsQuery,
  useUpdateOutingMutation,
} from "@/services/admin";
import type { OutingProps } from "@/types";

import Review from "../Review/Review";
import styles from "./OutingDetails.module.scss";

type Props = {
  detailsData: OutingProps;
};
const chargePlanState = {
  title: "",
  description: "Charge Plan Description",
  currency: "NGN",
  cost: 0,
  adultMultiplier: 1,
  infantMultiplier: 0.3,
  childrenMultiplier: 0.4,
  petMultiplier: 0.4,
  quantity: 0,
  singleOccupancyAmount: 0,
  perPersonSharingAmount: 0,
  extraDurationCostPerDay: 0,
  initialPaymentPercent: 0.3,
};
const initialDestinationState = {
  city: "",
  country: "",
  continent: "",
  location: "",
};
const initialAddonState = {
  name: "",
  cost: 0,
  description: "",
  default: false,
};
const initialReviewState = {
  comment: "",
  rating: 0,
};
const OutingDetails = ({ detailsData }: Props) => {
  const [chargePlanPayload, setChargePlanPayload] = useState(chargePlanState);
  const [showInLandingPage, setShowInLandingPage] = useState(
    detailsData.showInLandingPage
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOnOpen, setIsAddOnOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [id, setId] = useState("");
  const [featuredImage, setFeaturedImage] = useState(false);
  const [pickupPayload, setPickupPayload] = useState(initialDestinationState);
  const [addonPayload, setAddonPayload] = useState(initialAddonState);
  const [reviewPayload, setReviewPayload] = useState(initialReviewState);
  const [destinationPayload, setDestinationPayload] = useState(
    initialDestinationState
  );
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    setId(detailsData.id);
    setChargePlanPayload({ ...chargePlanPayload, title: detailsData.name });
  }, []);

  const StarRating = () => {
    const handleStarClick = (value) => {
      setReviewPayload({ ...reviewPayload, rating: value });
    };

    return (
      <div>
        <p>Rating: {reviewPayload.rating}</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`cursor-pointer text-2xl ${
                value <= reviewPayload.rating
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onClick={() => handleStarClick(value)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    );
  };
  const [uploadImage, { isLoading, isError, error, isSuccess }] =
    useCreateOutingImageMutation();
  const { data: outingData, isSuccess: outingSuccess } = useGetOutingsQuery(
    `/${detailsData.id}`
  );
  const { data: outingAddon, isSuccess: outingAddonSuccess } =
    useGetOutingAddonsQuery(id);
  const [
    updateOuting,
    {
      isSuccess: updateOutingSuccess,
      isError: isUpdateOutingError,
      error: updateOutingError,
    },
  ] = useUpdateOutingMutation();
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
    createChargePlan,
    {
      isLoading: chargePlanLoading,
      isSuccess: chargePlanSuccess,
      isError: isChargePlanError,
      error: chargePlanError,
    },
  ] = useCreateChargePlanMutation();
  const [
    createAddon,
    {
      data: addonData,
      isSuccess: IsAddonSuccess,
      isError: IsAddonError,
      isLoading: addonLoading,
      error: addonError,
    },
  ] = useCreateOutingAddonMutation();
  const [uploadAddonIcon] = useCreateOutingAddonIconMutation();
  const [
    createReview,
    {
      isSuccess: createReviewSuccess,
      isError: isCreateReviewError,
      isLoading: createReviewLoading,
      error: createReviewError,
    },
  ] = useCreateReviewMutation();
  const { data: reviewData, isSuccess: reviewSuccess } = useGetReviewsQuery(id);
  useCreateOutingAddonMutation();
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
  const handleUploadImage = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file as File);
      formData.append("type", "image");
      formData.append("featured", featuredImage);
      uploadImage({
        query: id,
        data: formData,
      });
      setFile(null);
    }
  };
  useErrorHandler({
    isError,
    error,
  });
  useErrorHandler({
    isError: isUpdateOutingError,
    error: updateOutingError,
  });
  useErrorHandler({
    isError: IsAddonError,
    error: addonError,
  });
  useErrorHandler({
    isError: isCreateReviewError,
    error: createReviewError,
  });
  useErrorHandler({
    isError: isChargePlanError,
    error: chargePlanError,
  });
  useSuccessHandler({
    isSuccess,
    toastMessage: "Image uploaded successfully",
  });
  useSuccessHandler({
    isSuccess: updateOutingSuccess,
    toastMessage: "Update successful",
  });
  useSuccessHandler({
    isSuccess: createReviewSuccess,
    successFunction: () => {
      setReviewPayload(initialReviewState);
    },
    toastMessage: "Testimonial created successfully",
  });
  useSuccessHandler({
    isSuccess: chargePlanSuccess,
    successFunction: () => {
      setChargePlanPayload(chargePlanState);
    },
    toastMessage: "Charge Plan Created successfully",
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
    isSuccess: destinationSuccess,
    successFunction: () => {
      setDestinationPayload(initialDestinationState);
    },
    toastMessage: "Destination Created successfully!",
  });
  useSuccessHandler({
    isSuccess: IsAddonSuccess,
    successFunction: () => {
      if (file) {
        const formData = new FormData();
        formData.append("image", file as File);
        formData.append("type", "image");
        uploadAddonIcon({
          query: id,
          id: addonData.id,
          data: formData,
        });
        setFile(null);
        setAddonPayload(initialAddonState);
      }
    },
    toastMessage: "Addon Successfully Added",
  });
  useSuccessHandler({
    isSuccess: pickupSuccess,
    successFunction: () => {
      setPickupPayload(initialDestinationState);
    },
    toastMessage: "Pickup Created successfully!",
  });
  const handleDestinationSubmit = () => {
    uploadDestination({ query: id, data: destinationPayload });
  };
  const handlePickupSubmit = () => {
    uploadPickup({ query: id, data: pickupPayload });
  };
  const handleChargePlanSubmit = () => {
    createChargePlan({ query: id, data: chargePlanPayload });
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleAddonModal = () => {
    setIsAddOnOpen(!isAddOnOpen);
  };
  const toggleReviewModal = () => {
    setIsReviewOpen(!isReviewOpen);
  };
  const handleAddonSubmit = () => {
    createAddon({ query: id, data: addonPayload });
  };
  const handleReviewSubmit = () => {
    createReview({ query: id, data: reviewPayload });
  };
  useEffect(() => {
    if (showInLandingPage !== detailsData.showInLandingPage) {
      updateOuting({
        query: id,
        data: {
          // eslint-disable-next-line object-shorthand
          showInLandingPage: showInLandingPage,
          name: detailsData.name,
          description: detailsData.description,
          currency: "NGN",
          price: detailsData.price,
          type: detailsData.type,
          subType: detailsData.subType,
          deadlineGap: detailsData.deadlineGap,
        },
      });
    }
  }, [showInLandingPage]);
  const handleSwitchChange = () => {
    setShowInLandingPage(!showInLandingPage);
  };
  return (
    <div>
      <div className="mx-[40px] mt-[40px]">
        <div
          className="flex h-[38px] w-fit cursor-pointer items-center gap-2 rounded-3xl border bg-[#ffffff] px-[20px] text-[14px] font-semibold"
          onClick={router.back}
        >
          <AiOutlineArrowLeft className="font-dmSansBold text-xl" /> Back
        </div>
        <div className="mt-[48px] w-full max-w-[1089px] rounded-xl bg-[#ffffff] px-[16px] py-[10px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[20px]">
              <Image
                src={
                  outingData?.outingGallery.find((res) => res.featured === true)
                    ?.image || "/assets/images/admin/featured_image.png"
                }
                width={78}
                height={70}
                alt="featured cover imgage"
                className="h-[70px] w-[78px] rounded-xl"
              />
              <Text className="text-[24px] font-bold">{detailsData.name}</Text>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex max-h-[40px] items-center gap-3 rounded-3xl text-[14px]"
              >
                <RiDeleteBinLine className="text-xl" />
                Delete
              </Button>
              <Button
                className="flex max-h-[40px] items-center gap-3 rounded-3xl text-[14px]"
                onClick={() => {
                  setIsOpen(!isOpen);
                  setFeaturedImage(true);
                }}
              >
                <AiOutlineUpload className="text-xl" />
                Upload Cover Image
              </Button>
            </div>
          </div>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
                onClick={toggleModal}
              ></div>
              <div className="fixed inset-x-0 top-[70px] z-[32] flex items-center justify-center overflow-auto lg:left-[510px] lg:w-[420px]">
                <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                  <div className="flex justify-between">
                    <Heading type="h3">Upload Image</Heading>
                    <p
                      className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                      onClick={toggleModal}
                    >
                      X
                    </p>
                  </div>
                  {file ? (
                    <figure className="mt-[20px]">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="w-full rounded-xl"
                      />
                    </figure>
                  ) : (
                    <div className="mt-[20px]" {...getRootProps()}>
                      <input
                        {...getInputProps()}
                        accept="image/*"
                        multiple={false}
                      />

                      <TbFileUpload className="cursor-pointer text-3xl" />

                      {isDragActive ? (
                        <Text className="font-dmSansBold">
                          Drop your image here!
                        </Text>
                      ) : (
                        <>
                          <Text className="cursor-default text-[10px] font-light">
                            We recommend an image of at least 400x400. Supports
                            jpg, png and gif
                          </Text>
                        </>
                      )}
                    </div>
                  )}
                  <Button
                    className="mt-5 rounded-2xl text-[14px]"
                    onClick={handleUploadImage}
                    loading={isLoading}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.container}>
          <div className={styles.card_left}>
            <div className={styles.card_body}>
              <div className="mx-[32px] py-[32px]">
                <Heading type="h3">Brief Description</Heading>
                <Text className="mt-[20px] rounded-2xl border p-[10px] font-dmSansRegular text-[14px] text-[#344054]">
                  {detailsData.description}
                </Text>
              </div>
            </div>
            <div className={styles.card_body}>
              <div className="mx-[25px] py-[32px]">
                <div className="flex items-center justify-between">
                  <Heading type="h3">Flight Itenaries</Heading>
                  <p
                    className="flex cursor-pointer items-center gap-1 text-[14px] font-normal text-[#0A83FF] underline"
                    onClick={toggleAddonModal}
                  >
                    <IoAdd className="text-2xl" />
                    Add Itineary
                  </p>
                </div>
                {isAddOnOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
                      onClick={toggleAddonModal}
                    ></div>
                    <div className="fixed inset-x-0 top-[70px] z-[32] flex items-center justify-center overflow-auto lg:left-[510px] lg:w-[420px]">
                      <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                        <div className="flex justify-between">
                          <Heading type="h3">Flight Itinerary</Heading>
                          <p
                            className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                            onClick={toggleAddonModal}
                          >
                            X
                          </p>
                        </div>
                        <div className="mt-[20px] flex gap-5">
                          <p
                            className={`cursor-pointer rounded-md border px-2 py-1 font-dmSansRegular text-[14px] ${
                              addonPayload.default === true
                                ? "  bg-[#000000] text-[#ffffff]"
                                : ""
                            }`}
                            onClick={() =>
                              setAddonPayload({
                                ...addonPayload,
                                default: true,
                              })
                            }
                          >
                            Default Itinerary
                          </p>
                          <p
                            className={`cursor-pointer rounded-md border px-2 py-1 font-dmSansRegular text-[14px] ${
                              addonPayload.default === false
                                ? "  bg-[#000000] text-[#ffffff]"
                                : ""
                            }`}
                            onClick={() =>
                              setAddonPayload({
                                ...addonPayload,
                                default: false,
                              })
                            }
                          >
                            Addons
                          </p>
                        </div>
                        <div className="my-[10px]">
                          <Input
                            label="Name"
                            placeholder="Enter addon name"
                            value={addonPayload.name}
                            onChange={(e) =>
                              setAddonPayload({
                                ...addonPayload,
                                name: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="Description"
                            placeholder="Enter addon description"
                            value={addonPayload.description}
                            onChange={(e) =>
                              setAddonPayload({
                                ...addonPayload,
                                description: e.target.value,
                              })
                            }
                          />
                          {addonPayload.default === false && (
                            <Input
                              label="Cost"
                              placeholder="Enter adddon price"
                              value={addonPayload.cost}
                              onChange={(e) =>
                                setAddonPayload({
                                  ...addonPayload,
                                  cost: e.target.value,
                                })
                              }
                            />
                          )}
                          {file ? (
                            <figure className="mt-[20px]">
                              <img
                                src={URL.createObjectURL(file)}
                                alt=""
                                className="mx-auto max-h-[90px] w-full max-w-[90px] rounded-xl"
                              />
                            </figure>
                          ) : (
                            <div className="mt-[20px]" {...getRootProps()}>
                              <input
                                {...getInputProps()}
                                accept="image/*"
                                multiple={false}
                              />

                              <TbFileUpload className="cursor-pointer text-3xl" />

                              {isDragActive ? (
                                <Text className="font-dmSansBold">
                                  Drop your image here!
                                </Text>
                              ) : (
                                <>
                                  <Text className="cursor-pointer text-[10px] font-light">
                                    We recommend an image of at least 200x200.
                                    Supports jpg, png and gif
                                  </Text>
                                </>
                              )}
                            </div>
                          )}
                          <Button
                            className="my-4 w-full rounded-3xl"
                            loading={addonLoading}
                            onClick={handleAddonSubmit}
                          >
                            Add Itinerary
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="mx-[-5px] mt-[25px] grid grid-cols-3 gap-2">
                  {outingAddonSuccess &&
                    outingAddon.map(
                      (
                        info: React.JSX.IntrinsicAttributes & {
                          name: string;
                          description: string;
                          icon: string;
                          cost: string;
                          default: boolean;
                        },
                        index: React.Key | null | undefined
                      ) => <Addon key={index} {...info} />
                    )}
                </div>
              </div>
            </div>
            <div className={styles.card_body}>
              <div className="mx-[32px] py-[32px]">
                <div className="flex items-center justify-between">
                  <Heading type="h3">Photos</Heading>
                  <p
                    className="flex cursor-pointer items-center gap-1 text-[14px] font-normal text-[#0A83FF] underline"
                    onClick={() => {
                      setIsOpen(!isOpen);
                      setFeaturedImage(false);
                    }}
                  >
                    <IoAdd className="text-2xl" />
                    Add Photos
                  </p>
                </div>
                <div className="mt-[25px] grid grid-cols-4 gap-3">
                  {outingSuccess &&
                    outingData?.outingGallery?.map((res) => (
                      <div key={res.id}>
                        <Image
                          src={res.image}
                          alt="uploaded image"
                          width={155}
                          height={140}
                          className="h-[140px] w-[155px] rounded-md"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className={styles.card_body}>
              <div className="mx-[32px] py-[32px]">
                <div className="flex items-center justify-between">
                  <Heading type="h3">Reviews</Heading>
                  <p
                    className="flex cursor-pointer items-center gap-1 text-[14px] font-normal text-[#0A83FF] underline"
                    onClick={toggleReviewModal}
                  >
                    <IoAdd className="text-2xl" />
                    Add Review
                  </p>
                </div>
                {isReviewOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
                      onClick={toggleReviewModal}
                    ></div>
                    <div className="fixed inset-x-0 top-[70px] z-[32] flex items-center justify-center overflow-auto lg:left-[510px] lg:w-[420px]">
                      <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                        <div className="flex justify-between">
                          <Heading type="h3">New Testimonial</Heading>
                          <p
                            className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                            onClick={toggleReviewModal}
                          >
                            X
                          </p>
                        </div>
                        <div className="mt-[20px] flex flex-col gap-5">
                          <StarRating />
                          <TextArea
                            label="Testimonial"
                            placeholder="Enter Comment here"
                            className="h-[164px] w-[350px]"
                            value={reviewPayload.comment}
                            onChange={(e) =>
                              setReviewPayload({
                                ...reviewPayload,
                                comment: e.target.value,
                              })
                            }
                          />
                          <Button
                            className="my-3 w-full rounded-3xl"
                            onClick={handleReviewSubmit}
                            loading={createReviewLoading}
                          >
                            Add Testimonial
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="mx-[-5px] mt-[25px] grid gap-[24px]">
                  {reviewSuccess &&
                    reviewData.result.map((info) => (
                      <Review key={info.id} detailsData={info} />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.card_right}>
            <div className={styles.card_body}>
              <div className="mx-[20px] py-[24px]">
                <Heading type="h3">Pickup Details</Heading>
                <Input
                  label="Pickup City"
                  placeholder="Enter pickup City"
                  value={pickupPayload.city}
                  onChange={(e) =>
                    setPickupPayload({ ...pickupPayload, city: e.target.value })
                  }
                />
                <Input
                  label="Pickup Continent"
                  placeholder="Enter pickup Continent"
                  className="w-full"
                  value={pickupPayload.continent}
                  onChange={(e) =>
                    setPickupPayload({
                      ...pickupPayload,
                      continent: e.target.value,
                    })
                  }
                />
                <Input
                  label="Pickup Country"
                  placeholder="Enter pickup Country"
                  value={pickupPayload.country}
                  onChange={(e) =>
                    setPickupPayload({
                      ...pickupPayload,
                      country: e.target.value,
                    })
                  }
                />
                <Input
                  label="Pickup Location"
                  placeholder="Enter Lat and Long of address"
                  value={pickupPayload.location}
                  onChange={(e) =>
                    setPickupPayload({
                      ...pickupPayload,
                      location: e.target.value,
                    })
                  }
                />
                <Button
                  className="my-3 w-full rounded-3xl"
                  onClick={handlePickupSubmit}
                  loading={pickupLoading}
                >
                  Update Pickup
                </Button>
              </div>
            </div>
            <div className={styles.card_body}>
              <div className="mx-[20px] py-[24px]">
                <Heading type="h3">Destination Details</Heading>
                <Input
                  label="Destination City"
                  placeholder="Enter Destination City"
                  value={destinationPayload.city}
                  onChange={(e) =>
                    setDestinationPayload({
                      ...destinationPayload,
                      city: e.target.value,
                    })
                  }
                />
                <Input
                  label="Destination Continent"
                  placeholder="Enter Destination Continent"
                  value={destinationPayload.continent}
                  onChange={(e) =>
                    setDestinationPayload({
                      ...destinationPayload,
                      continent: e.target.value,
                    })
                  }
                />
                <Input
                  label="Destination Country"
                  placeholder="Enter Destination Country"
                  value={destinationPayload.country}
                  onChange={(e) =>
                    setDestinationPayload({
                      ...destinationPayload,
                      country: e.target.value,
                    })
                  }
                />
                <Input
                  label="Destination Location"
                  placeholder="Enter Lat and Long of address"
                  value={destinationPayload.location}
                  onChange={(e) =>
                    setDestinationPayload({
                      ...destinationPayload,
                      location: e.target.value,
                    })
                  }
                />
                <Button
                  className="my-3 w-full rounded-3xl"
                  onClick={handleDestinationSubmit}
                  loading={destinationLoading}
                >
                  Update Destination
                </Button>
              </div>
            </div>
            <div className={styles.card_body}>
              <div className="mx-[20px] py-[24px]">
                <Heading type="h3">Charge Plans</Heading>
                <Input
                  label="Cost"
                  placeholder="Enter Outing Cost"
                  value={chargePlanPayload.cost}
                  onChange={(e) =>
                    setChargePlanPayload({
                      ...chargePlanPayload,
                      cost: e.target.value,
                    })
                  }
                />
                <Input
                  label="Single Occupancy Amount"
                  placeholder="Enter Single Occupancy Amount"
                  value={chargePlanPayload.singleOccupancyAmount}
                  onChange={(e) =>
                    setChargePlanPayload({
                      ...chargePlanPayload,
                      singleOccupancyAmount: e.target.value,
                    })
                  }
                />
                <Input
                  label="Per Person Sharing Amount"
                  placeholder="Enter Per Person Sharing Amount"
                  value={chargePlanPayload.perPersonSharingAmount}
                  onChange={(e) =>
                    setChargePlanPayload({
                      ...chargePlanPayload,
                      perPersonSharingAmount: e.target.value,
                    })
                  }
                />
                <Input
                  label="Extra Duration Cost Per Day"
                  placeholder="Enter Extra Duration Cost Per Day"
                  value={chargePlanPayload.extraDurationCostPerDay}
                  onChange={(e) =>
                    setChargePlanPayload({
                      ...chargePlanPayload,
                      extraDurationCostPerDay: e.target.value,
                    })
                  }
                />
                <div className="my-3 flex flex-col gap-2">
                  <Text>
                    Infant Multiplier: {chargePlanPayload.infantMultiplier}
                  </Text>
                  <Slider
                    max={1}
                    step={0.05}
                    value={[chargePlanPayload.infantMultiplier]}
                    onValueChange={(e) =>
                      setChargePlanPayload({
                        ...chargePlanPayload,
                        infantMultiplier: e[0],
                      })
                    }
                  />
                </div>
                <div className="my-3 flex flex-col gap-2">
                  <Text>
                    Children Multiplier: {chargePlanPayload.childrenMultiplier}
                  </Text>
                  <Slider
                    max={1}
                    step={0.05}
                    value={[chargePlanPayload.childrenMultiplier]}
                    onValueChange={(e) =>
                      setChargePlanPayload({
                        ...chargePlanPayload,
                        childrenMultiplier: e[0],
                      })
                    }
                  />
                </div>
                <div className="my-3 flex flex-col gap-2">
                  <Text>Pet Multiplier: {chargePlanPayload.petMultiplier}</Text>
                  <Slider
                    max={1}
                    step={0.05}
                    value={[chargePlanPayload.petMultiplier]}
                    onValueChange={(e) =>
                      setChargePlanPayload({
                        ...chargePlanPayload,
                        petMultiplier: e[0],
                      })
                    }
                  />
                </div>
                <div className="my-3 flex flex-col gap-2">
                  <Text>
                    Initial Payment percentage:{" "}
                    {chargePlanPayload.initialPaymentPercent}
                  </Text>
                  <Slider
                    max={1}
                    step={0.05}
                    value={[chargePlanPayload.initialPaymentPercent]}
                    onValueChange={(e) =>
                      setChargePlanPayload({
                        ...chargePlanPayload,
                        initialPaymentPercent: e[0],
                      })
                    }
                  />
                </div>
                <Button
                  className="my-3 w-full rounded-3xl"
                  onClick={handleChargePlanSubmit}
                  loading={chargePlanLoading}
                >
                  Create Charge Plan
                </Button>
              </div>
            </div>
            <div className={styles.card_body}>
              <div className="mx-[20px] py-[24px]">
                <Heading type="h3">Show Outing In Landing Page</Heading>
                <div className="mt-5 ">
                  <Switch
                    checked={showInLandingPage}
                    value={showInLandingPage}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutingDetails;