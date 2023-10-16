// @ts-nocheck

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

import Button from "@/components/lib/Button/Button";
import FileUpload from "@/components/lib/FileUpload";
import { formatDatesRange } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import Select from "@/components/lib/Select";
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
  useCreateOutingDateMutation,
  useCreateOutingDestinationMutation,
  useCreateOutingImageMutation,
  useCreateOutingPickupMutation,
  useCreateReviewMutation,
  useDeleteOutingAddonMutation,
  useDeleteOutingDateMutation,
  useDeleteOutingFeaturedImageMutation,
  useDeleteOutingGalleryImageMutation,
  useGetChargePlanQuery,
  useGetOutingAddonsQuery,
  useGetReviewsQuery,
  useUpdateChargePlanMutation,
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
const outingDateState = {
  startDate: "",
  endDate: "",
};

const continent = [
  { value: "Africa", label: "Africa" },
  { value: "Asia", label: "Asia" },
  { value: "Antarctica", label: "Antarctica" },
  { value: "Australia", label: "Australia" },
  { value: "Europe", label: "Europe" },
  { value: "North America", label: "North America" },
  { value: "South America", label: "South America" },
];

const OutingDetails = ({ detailsData }: Props) => {
  const [chargePlanPayload, setChargePlanPayload] = useState(chargePlanState);
  const [showInLandingPage, setShowInLandingPage] = useState(
    detailsData.showInLandingPage
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isAddOnOpen, setIsAddOnOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [id, setId] = useState("");
  const [featuredImage, setFeaturedImage] = useState(false);
  const [pickupPayload, setPickupPayload] = useState(initialDestinationState);
  const [addonPayload, setAddonPayload] = useState(initialAddonState);
  const [reviewPayload, setReviewPayload] = useState(initialReviewState);
  const [datePayload, setDatePayload] = useState(outingDateState);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [addonFiles, setAddonFiles] = useState<File[]>([]);
  const [destinationPayload, setDestinationPayload] = useState(
    initialDestinationState
  );
  const router = useRouter();
  useEffect(() => {
    setId(detailsData.id);
    setChargePlanPayload({ ...chargePlanPayload, title: detailsData.name });
    if (detailsData.outingPickup) {
      setPickupPayload({
        ...pickupPayload,
        city: detailsData?.outingPickup?.city,
        country: detailsData?.outingPickup?.country,
        continent: detailsData.outingPickup?.continent,
        location: detailsData?.outingPickup?.location,
      });
    }
    if (detailsData.outingDestination) {
      setDestinationPayload({
        ...destinationPayload,
        city: detailsData?.outingDestination?.city,
        country: detailsData?.outingDestination?.country,
        continent: detailsData?.outingDestination?.continent,
        location: detailsData?.outingDestination?.location,
      });
    }
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
  const [
    createDate,
    {
      isLoading: dateloading,
      isError: isDateError,
      error: dateError,
      isSuccess: dateSuccess,
    },
  ] = useCreateOutingDateMutation();
  const { data: outingAddon, isSuccess: outingAddonSuccess } =
    useGetOutingAddonsQuery(id);
  const { data: chargePlanData, isSuccess: getChargePlanDataSuccess } =
    useGetChargePlanQuery(id);
  const [
    deleteAddon,
    {
      isSuccess: deleteAddonSuccess,
      isError: isDeleteAddonError,
      error: deleteAddonError,
    },
  ] = useDeleteOutingAddonMutation();
  const [
    deleteOutingImage,
    {
      isSuccess: deleteOutingImageSuccess,
      isError: isDeleteOutingImageError,
      error: deleteOutingImageError,
    },
  ] = useDeleteOutingGalleryImageMutation();
  const [
    deleteOutingDate,
    {
      isSuccess: deleteOutingDateSuccess,
      isError: isDeleteOutingDateError,
      error: deleteOutingDateError,
      isLoading: deleteDateLoading,
    },
  ] = useDeleteOutingDateMutation();
  const [
    deleteFeaturedImage,
    {
      isSuccess: deleteFeaturedImageSuccess,
      isError: isDeleteFeaturedImageError,
      error: deleteFeaturedImageError,
    },
  ] = useDeleteOutingFeaturedImageMutation();
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
    updateChargePlan,
    {
      isLoading: updateChargePlanLoading,
      isSuccess: updateChargePlanSuccess,
      isError: isUpdateChargePlanError,
      error: updateChargePlanError,
    },
  ] = useUpdateChargePlanMutation();
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
  const handlePhotoChange = (files: File[]) => {
    setPhotoFiles(files);
  };
  const handleAddonChange = (files: File[]) => {
    setAddonFiles(files);
  };
  const handleUploadImage = () => {
    const formData = new FormData();
    if (photoFiles) {
      if (photoFiles.length > 0) {
        for (let i = 0; i < photoFiles.length; i += 1) {
          if (photoFiles[i]) {
            formData.append("image", photoFiles[i] as File);
            // formData.append("image", photoFiles as File);
            formData.append("type", "image");
            formData.append("featured", featuredImage);
            uploadImage({
              query: id,
              data: formData,
            });
            setPhotoFiles([]);
          }
        }
      }
    }
  };
  useErrorHandler({
    isError,
    error,
  });
  useErrorHandler({
    isError: isDateError,
    error: dateError,
  });
  useErrorHandler({
    isError: isDeleteAddonError,
    error: deleteAddonError,
  });
  useErrorHandler({
    isError: isDeleteOutingImageError,
    error: deleteOutingImageError,
  });
  useErrorHandler({
    isError: isDeleteOutingDateError,
    error: deleteOutingDateError,
  });
  useErrorHandler({
    isError: isDeleteFeaturedImageError,
    error: deleteFeaturedImageError,
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
  useErrorHandler({
    isError: isUpdateChargePlanError,
    error: updateChargePlanError,
  });
  useSuccessHandler({
    isSuccess,
    toastMessage: "Image uploaded successfully",
  });
  useSuccessHandler({
    isSuccess: dateSuccess,
    toastMessage: "Outing Date Created successfully",
  });
  useSuccessHandler({
    isSuccess: deleteAddonSuccess,
    toastMessage: "Addon deleted successfully",
  });
  useSuccessHandler({
    isSuccess: deleteOutingImageSuccess,
    toastMessage: "Image deleted successfully",
  });
  useSuccessHandler({
    isSuccess: deleteOutingDateSuccess,
    toastMessage: "Date deleted successfully",
  });
  useSuccessHandler({
    isSuccess: deleteFeaturedImageSuccess,
    toastMessage: "Cover Image Deleted Successfully",
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
    isSuccess: getChargePlanDataSuccess,
    successFunction: () => {
      setChargePlanPayload({
        ...chargePlanPayload,
        cost: Math.floor(chargePlanData.cost),
        extraDurationCostPerDay: Math.floor(
          chargePlanData.extraDurationCostPerDay
        ),
        perPersonSharingAmount: Math.floor(
          chargePlanData.perPersonSharingAmount
        ),
        singleOccupancyAmount: Math.floor(chargePlanData.singleOccupancyAmount),
        infantMultiplier: chargePlanData.infantMultiplier,
        childrenMultiplier: chargePlanData.childrenMultiplier,
        initialPaymentPercent: chargePlanData.initialPaymentPercent,
      });
    },
    showToast: false,
  });
  useSuccessHandler({
    isSuccess: chargePlanSuccess,
    toastMessage: "Charge Plan Created successfully",
  });
  useSuccessHandler({
    isSuccess: updateChargePlanSuccess,
    toastMessage: "Charge Plan Updated successfully",
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
    toastMessage: "Destination Created successfully!",
  });
  useSuccessHandler({
    isSuccess: IsAddonSuccess,
    successFunction: () => {
      const formData = new FormData();
      if (addonFiles) {
        if (addonFiles.length > 0) {
          for (let i = 0; i < addonFiles.length; i += 1) {
            if (addonFiles[i]) {
              formData.append("image", addonFiles[i] as File);
              formData.append("type", "image");
              uploadAddonIcon({
                query: id,
                id: addonData.id,
                data: formData,
              });
              setAddonFiles([]);
              setAddonPayload(initialAddonState);
            }
          }
        }
      }
    },
    toastMessage: "Addon Successfully Added",
  });
  useSuccessHandler({
    isSuccess: pickupSuccess,
    toastMessage: "Pickup Created successfully!",
  });
  const handleDestinationSubmit = () => {
    uploadDestination({ query: id, data: destinationPayload });
  };
  const handlePickupSubmit = () => {
    uploadPickup({ query: id, data: pickupPayload });
  };
  const handleChargePlanSubmit = () => {
    if (getChargePlanDataSuccess && chargePlanData) {
      updateChargePlan({ query: chargePlanData.id, data: chargePlanPayload });
    } else {
      createChargePlan({ query: id, data: chargePlanPayload });
    }
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleAddonModal = () => {
    setIsAddOnOpen(!isAddOnOpen);
  };
  const toggleDateModal = () => {
    setIsDateOpen(!isDateOpen);
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
        <div className="mt-[48px] w-full rounded-xl bg-[#ffffff] px-[16px] py-[10px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[20px]">
              <Image
                src={
                  detailsData.outingGallery.find((res) => res.featured === true)
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
                onClick={() => deleteFeaturedImage(id)}
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
                  <FileUpload
                    multiple={true}
                    files={photoFiles}
                    name="file"
                    handleChange={handlePhotoChange}
                  />
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
            {detailsData.type === "tour" && (
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
                            <FileUpload
                              multiple={true}
                              name="file"
                              files={addonFiles}
                              handleChange={handleAddonChange}
                            />
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
                  <div className="mx-[-5px] mt-[25px] grid grid-cols-3 gap-2 2xl:grid-cols-4">
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
                        ) => (
                          <div key={info.id} className="relative">
                            <div
                              className="absolute right-0 top-0 cursor-pointer rounded-full bg-[#ffffff] p-2"
                              onClick={() =>
                                deleteAddon({
                                  query: detailsData.id,
                                  id: info.id,
                                })
                              }
                            >
                              <GiCancel className="text-[#98A2B3]" />
                            </div>{" "}
                            <Addon key={index} {...info} />
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            )}
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
                <div className="mt-[25px] grid grid-cols-4 gap-3 2xl:grid-cols-5">
                  {detailsData.outingGallery?.map((res) => (
                    <div key={res.id} className="relative">
                      <div
                        className="absolute right-[45%] top-[45%] cursor-pointer rounded-full bg-[#ffffff] p-2"
                        onClick={() =>
                          deleteOutingImage({
                            query: id,
                            id: res.id,
                          })
                        }
                      >
                        <RiDeleteBinLine className="text-[#F04438]" />
                      </div>
                      <Image
                        src={res.image}
                        alt="uploaded image"
                        width={155}
                        height={140}
                        className="h-[140px] w-[155px] rounded-md 2xl:h-[175px] 2xl:w-[200px] "
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
                      <Review key={info.id} detailsData={info} design={false} />
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
                <Select
                  label="Pickup Continent"
                  placeholder="Select Pickup Continent"
                  className="w-full"
                  value={pickupPayload.continent}
                  onChange={(event) =>
                    setPickupPayload({
                      ...pickupPayload,
                      continent: event.value,
                    })
                  }
                  options={continent.map((options) => ({
                    value: options.value,
                    label: options.label,
                  }))}
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
                <Select
                  label="Destination Continent"
                  placeholder="Select Destination Continent"
                  className="w-full"
                  value={destinationPayload.continent}
                  onChange={(event) =>
                    setDestinationPayload({
                      ...destinationPayload,
                      continent: event.value,
                    })
                  }
                  options={continent.map((options) => ({
                    value: options.value,
                    label: options.label,
                  }))}
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
                  loading={chargePlanLoading || updateChargePlanLoading}
                >
                  {getChargePlanDataSuccess ? "Update" : "Create"} Charge Plan
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
            {detailsData.type === "tour" && (
              <div className={styles.card_body}>
                <div className="mx-[20px] py-[24px]">
                  <div className="flex items-center justify-between">
                    <Heading type="h3">Outing Dates</Heading>
                    <p
                      className="flex cursor-pointer items-center gap-1 text-[14px] font-normal text-[#0A83FF] underline"
                      onClick={toggleDateModal}
                    >
                      <IoAdd className="text-2xl" />
                      Add
                    </p>
                  </div>
                  {isDateOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
                        onClick={toggleDateModal}
                      ></div>
                      <div className="fixed inset-x-0 top-[70px] z-[32] flex items-center justify-center overflow-auto lg:left-[500px] lg:w-[450px]">
                        <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                          <div className="flex justify-between">
                            <Heading type="h3">New Outing Date</Heading>
                            <p
                              className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                              onClick={toggleDateModal}
                            >
                              X
                            </p>
                          </div>
                          <div>
                            <Input
                              label="Start Date"
                              placeholder="Select start date"
                              type="date"
                              value={datePayload.startDate}
                              onChange={(event) =>
                                setDatePayload({
                                  ...datePayload,
                                  startDate: event.target.value,
                                })
                              }
                              className="w-[200px]"
                            />
                            <Input
                              label="End Date"
                              placeholder="Select end date"
                              value={datePayload.endDate}
                              type="date"
                              onChange={(event) =>
                                setDatePayload({
                                  ...datePayload,
                                  endDate: event.target.value,
                                })
                              }
                              className="w-[200px]"
                            />
                            <Button
                              className="my-3 w-full rounded-3xl"
                              disabled={
                                !datePayload.startDate || !datePayload.endDate
                              }
                              onClick={() => {
                                createDate({ query: id, data: datePayload });
                              }}
                              loading={dateloading}
                            >
                              Create Date
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="mt-2">
                    {detailsData.outingDate.map((res) => (
                      <div
                        key={res.id}
                        className="my-2 flex items-center justify-between rounded-md bg-[#ffffff] p-2 shadow-md"
                      >
                        {formatDatesRange(res.startDate, res.endDate)}
                        <Button
                          variant="outline"
                          className="flex max-h-[40px] items-center gap-3 rounded-3xl text-[14px]"
                          onClick={() => deleteOutingDate(res.id)}
                          loading={deleteDateLoading}
                        >
                          <RiDeleteBinLine className="text-xl" />
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutingDetails;
