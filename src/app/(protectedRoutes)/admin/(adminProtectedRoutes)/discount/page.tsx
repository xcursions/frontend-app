"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import * as Yup from "yup";

import Button from "@/components/lib/Button";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input";
import Loader from "@/components/lib/Loader";
import { Pagination } from "@/components/lib/Pagination";
import Select from "@/components/lib/Select";
import Text from "@/components/lib/Text";
import type { CouponResponse } from "@/services/admin/payload";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useEditCouponMutation,
  useGetCouponsQuery,
} from "@/services/admin/transaction";
import { standardDate } from "@/utils/standardDate";

const CouponSchema = Yup.object({
  code: Yup.string().required("Code is required"),
  type: Yup.string().required(),
  value: Yup.number().min(1).required("Value is required and must be a number"),
  numberOfUses: Yup.number()
    .min(2)
    .required("Number of use is required and must be a number"),
  expirationDate: Yup.string().required(),
});
type CouponSchemaType = Yup.InferType<typeof CouponSchema>;

const CouponType = [
  { value: "percentage", label: "Percentage" },
  { value: "value", label: "Value" },
];

const Discount = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [couponModal, setCouponModal] = useState(false);
  const [isEditing, setIsEditing] = useState("");
  const limit = 10;

  const [createCoupon, { isLoading: createCouponLoading }] =
    useCreateCouponMutation();
  const [editCoupon, { isLoading: editCouponLoading }] =
    useEditCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();
  const {
    data: couponData,
    isFetching: couponDataLoading,
    isSuccess,
    refetch,
  } = useGetCouponsQuery({ currentPage, pageLimit: limit });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(CouponSchema) });

  const toggleModal = () => {
    setCouponModal(!couponModal);
  };

  const onSubmit = async (val: CouponSchemaType) => {
    if (isEditing.length > 1) {
      await editCoupon({ data: val, id: isEditing })
        .unwrap()
        .then(() => {
          toast.success("Coupon Updated Successfully");
          reset();
          setIsEditing("");
          refetch();
        })
        .catch(() => toast.error("An error occurred"));
    } else {
      await createCoupon(val)
        .unwrap()
        .then(() => {
          toast.success("Coupon Created Successfully");
          reset();
          setIsEditing("");
          refetch();
        })
        .catch(() => toast.error("An error occurred"));
    }
  };

  const handleDelete = async (id: string) => {
    deleteCoupon({ id })
      .unwrap()
      .then(() => {
        toast.success("Coupon Deleted Successfully");
        setIsEditing("");
        refetch();
      })
      .catch(() => toast.error("An error occurred"));
  };

  const CouponCard = (val: CouponResponse) => (
    <div className="relative h-full w-full max-w-[500px] shrink-0 rounded-2xl bg-white pb-4 shadow-md">
      <div className="absolute right-2 top-2">
        <MdDelete
          onClick={() => handleDelete(val.id)}
          className="cursor-pointer text-[#F5A524]"
          size={24}
        />
      </div>
      <div className="absolute left-2 top-2">
        <MdEdit
          onClick={() => {
            setCouponModal(true);
            setIsEditing(val.id);
            setValue("code", val.code);
            setValue("numberOfUses", val.numberOfUses);
            setValue("type", val.type);
            setValue("value", val.value as unknown as number);
            setValue("expirationDate", val.expirationDate);
          }}
          className="cursor-pointer text-[#F5A524]"
          size={24}
        />
      </div>
      <div className="mx-4 flex h-full flex-col items-center justify-center gap-2 py-2 text-center">
        <p className=" font-dmSansBold text-xl">
          Coupon Code:{" "}
          <span className="font-kufam text-xl font-medium leading-tight text-[#131620] md:text-2xl">
            {val.code}
          </span>
        </p>
        <p className=" font-dmSansBold text-xl">
          Expires:{" "}
          <span className="font-kufam text-xl font-medium leading-tight text-[#131620] md:text-2xl">
            {standardDate(val.expirationDate)}
          </span>
        </p>
        <p className=" font-dmSansBold text-xl">
          Total usage allowed:{" "}
          <span className="font-kufam text-xl font-medium leading-tight text-[#131620] md:text-2xl">
            {val.numberOfUses}
          </span>
        </p>
        <p className=" font-dmSansBold text-xl">
          Remaining Usage:{" "}
          <span className="font-kufam text-xl font-medium leading-tight text-[#131620] md:text-2xl">
            {val.numberOfRemainingUses}
          </span>
        </p>
      </div>
    </div>
  );
  const renderCoupons = () => {
    if (couponDataLoading) {
      return <Loader />;
    }

    if (isSuccess) {
      if (couponData?.result.length) {
        return couponData.result.map((res) => (
          <CouponCard {...res} key={res.id} />
        ));
      }
      return <p>No Coupon added yet</p>;
    }
    return <p>An Error Occurred</p>;
  };
  return (
    <>
      <div className="flex items-center justify-between px-[50px] pt-[40px]">
        <div className=" items-center">
          <Heading className=" text-2xl text-[#101828]">
            Discounts/Coupons
          </Heading>
        </div>
        <div className=" flex h-[38px] gap-3">
          <Button
            className=" flex items-center gap-2 rounded-[100px] text-[14px]"
            onClick={() => setCouponModal(true)}
          >
            <AiOutlinePlus className="text-[20px]" /> New Coupon
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between px-[50px] pt-[40px]">
        <Text type="subheading">All Coupons</Text>
      </div>
      <div className="flex flex-wrap gap-2 px-[50px] pt-[40px]">
        {renderCoupons()}
      </div>
      {couponData ? (
        <Pagination
          className="pagination-bar my-8"
          currentPage={currentPage}
          totalCount={couponData?.totalElements}
          pageLimit={limit}
          onPageChange={(v) => setCurrentPage(v)}
        />
      ) : null}

      {couponModal ? (
        <>
          {" "}
          <div
            className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
            onClick={toggleModal}
          ></div>
          <div className="fixed inset-0 z-[32] flex w-[326px] items-center justify-center lg:left-[510px] lg:w-[418px]">
            <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
              <div className="flex justify-between">
                <Heading type="h3" className="text-[18px] text-[#101828]">
                  {isEditing.length ? "Edit Coupon" : "Create Coupon"}
                </Heading>
                <p
                  className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                  onClick={toggleModal}
                >
                  <FaTimes />
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Coupon Code"
                  placeholder="Enter Coupon Code"
                  register={register("code")}
                  errorMsg={errors.code && errors.code.message}
                />
                <Select
                  label="Coupon Type"
                  placeholder="Select Coupon type"
                  onChange={(e) => setValue("type", e.value)}
                  options={CouponType.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                  showArrow
                />
                <Input
                  label="Value"
                  placeholder="Enter Value of Coupon"
                  register={register("value")}
                  errorMsg={errors.value && errors.value.message}
                />
                <Input
                  label="Number of Uses"
                  placeholder="Total times the coupon can be used"
                  register={register("numberOfUses")}
                  errorMsg={errors.numberOfUses && errors.numberOfUses.message}
                />
                <Input
                  type="date"
                  label="Expiry Date"
                  placeholder="Enter Expiry date"
                  register={register("expirationDate")}
                  errorMsg={
                    errors.expirationDate && errors.expirationDate.message
                  }
                />
                <Button
                  type="submit"
                  className="mt-1 w-full"
                  loading={createCouponLoading || editCouponLoading}
                >
                  {isEditing.length > 1 ? "Edit" : "Create"} Coupon
                </Button>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Discount;
