"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import toaster from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import FormCanvas from "@/components/admin/Bookings/FormCanvas";
// import { columns } from "@/components/admin/services/Colums";
import { DataTable } from "@/components/admin/services/DataTable";
import Button from "@/components/lib/Button";
import FullPageLoader from "@/components/lib/FullPageLoader";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input/Input";
import { Pagination } from "@/components/lib/Pagination";
import Text from "@/components/lib/Text";
import TextArea from "@/components/lib/TextArea/TextArea";
import useErrorHandler from "@/hooks/useErrorHandler";
import useSuccessHandler from "@/hooks/useSuccessHandler";
import {
  useCreateOutingMutation,
  useDeleteBannerMutation,
  useDeleteBlogMutation,
  useDeleteOutingMutation,
  useGetAllBannerQuery,
  useGetBlogPostQuery,
  useLazyGetOutingsQuery,
} from "@/services/admin";
import type { BannerResponse } from "@/services/admin/payload";
import type { BlogProps, OutingProps } from "@/types";
import { standardDate } from "@/utils/standardDate";

const initialState = {
  name: "",
  description: "",
  currency: "NGN",
  price: "",
  type: "",
  subType: "",
  startDate: "",
  endDate: "",
  deadlineGap: "",
  defaultOutingDurationInDays: "",
};
export type Payment = {
  id: string;
  name: string;
  createdAt: string;
  bookedBy: number;
  trip: string;
  amount: string;
  viewBy: number;
  image: string;
};
export type BlogPayment = {
  title: string;
  id: string;
  viewBy: number;
  createdAt: string;
  image: string;
};
interface BannerPayment {
  id: string;
  title: string;
  ctaLink: string;
  status: string;
  description: string;
  createdAt: string;
  image: string;
}

const Page = () => {
  const [newTrip, setNewTrip] = useState(false);
  const [isBlog, setIsBlog] = useState(false);
  const [isBanner, setIsBanner] = useState(false);
  const [outingType, setOutingType] = useState("tour");
  const [payload, setPayload] = useState(initialState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageBlog, setCurrentPageBlog] = useState<number>(1);
  const [activeForm, setActiveForm] = useState("");

  const router = useRouter();
  const pageLimit = 10;

  const [
    createOuting,
    {
      data: outingsData,
      isLoading: outingLoading,
      isSuccess: profileSuccess,
      isError: isProfileError,
      error: profileError,
    },
  ] = useCreateOutingMutation();
  const [getOuting, { data: outingData, isSuccess: outingSuccess }] =
    useLazyGetOutingsQuery();
  const [deleteOuting, { isSuccess: deleteSuccess }] =
    useDeleteOutingMutation();
  const [deleteBlog, { isSuccess: deleteBlogSuccess }] =
    useDeleteBlogMutation();
  const { data: blogDetails, isSuccess: blogSuccess } = useGetBlogPostQuery({
    pageLimit,
    currentPage: currentPageBlog,
  });
  const { data: bannerDetails, isSuccess: bannerSuccess } =
    useGetAllBannerQuery();
  const [deleteBanner, { isSuccess: deleteBannerSuccess }] =
    useDeleteBannerMutation();

  useEffect(() => {
    setPayload({ ...payload, type: outingType });
  }, [outingType]);
  useEffect(() => {
    getOuting(`?type=${outingType}&limit=${pageLimit}&page=${currentPage}`);
  }, [currentPage, pageLimit, outingType]);
  useEffect(() => {
    setCurrentPage(1);
  }, [outingType]);

  useErrorHandler({
    isError: isProfileError,
    error: profileError,
  });
  useSuccessHandler({
    isSuccess: profileSuccess,
    successFunction: () => {
      router.push(`/admin/services/${outingsData.id}`);
    },
    toastMessage: "Outing Created successfully!",
  });
  useSuccessHandler({
    isSuccess: deleteSuccess,
    toastMessage: "Outing Deleted successfully!",
  });
  useSuccessHandler({
    isSuccess: deleteBlogSuccess,
    toastMessage: "Blog Post Deleted",
  });
  useSuccessHandler({
    isSuccess: deleteBannerSuccess,
    toastMessage: "Banner Deleted",
  });

  const handleOpenOffCanvas = (formType: string) => {
    setActiveForm(formType);
    setNewTrip(true);
  };

  const handleClose = () => {
    setNewTrip(false);
    // refetch();
  };
  const handleCreateOuting = () => {
    createOuting(payload);
  };

  const data =
    outingSuccess &&
    outingData.result.map((res: OutingProps) => {
      return {
        trip: res.name,
        amount: res.outingChargePlan?.singleOccupancyAmount || "no price set",
        id: res.id,
        viewBy: res?.viewCount,
        createdAt: res.createdAt.split("T")[0],
        bookedBy: res?.bookingCount,
        image:
          res?.outingGallery[0]?.image ||
          "/assets/images/landing-page/Landing_page_Header.png",
      };
    });
  const blogData =
    blogSuccess &&
    blogDetails.result.map((res: BlogProps) => {
      return {
        title: res.title,
        id: res.id,
        viewBy: res.readTimeInMinute,
        createdAt: res.createdAt.split("T")[0],
        image: res?.blogFeaturedImage?.image,
      };
    });

  const bannerData =
    bannerSuccess &&
    bannerDetails.result.map((res: BannerResponse) => {
      return {
        title: res.title,
        id: res.id,
        status: res.status,
        ctaLink: res.ctaLink,
        createdAt: res.createdAt.split("T")[0],
        image: res?.imageUrl,
      };
    });

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "trip",
      header: () => <div className="font-dmSansMedium text-sm">Trip</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
            onClick={() => router.push(`/admin/services/${value.id}`)}
          >
            <Image
              src={value.image}
              alt={`${value.name}`}
              width={50}
              height={50}
              className="h-[50px] w-[50px] rounded-full"
            />
            <span>{value.trip}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="font-dmSansMedium text-sm">Amount</div>,
      cell: ({ row }) => {
        const amount = parseInt(row.getValue("amount"), 10).toLocaleString();
        return (
          <div className="text-[14px] font-medium text-[#101828]">
            ₦{amount}
          </div>
        );
      },
    },
    {
      accessorKey: "viewBy",
      header: () => <div className="font-dmSansMedium text-sm">View by</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={`text-[14px] font-medium text-[#101828]`}>
            {value.viewBy} Users
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="font-dmSansMedium text-sm">Date Created</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={` text-[14px] font-medium text-[#101828]`}>
            {standardDate(value.createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "bookedBy",
      header: () => <div className="font-dmSansMedium text-sm">Booked by</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={` text-[14px] font-medium text-[#101828]`}>
            {value.bookedBy}
          </div>
        );
      },
    },
    {
      id: "delete",
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer text-[20px] font-medium text-[#F04438]`}
            onClick={() => deleteOuting(value.id)}
          >
            <RiDeleteBin6Line />
          </div>
        );
      },
    },
  ];

  const blogColumns: ColumnDef<BlogPayment>[] = [
    {
      accessorKey: "image",
      header: () => <div className="font-dmSansMedium text-sm">Image</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
            onClick={() => router.push(`/admin/services/blog/${value.id}`)}
          >
            <Image
              src={value.image || "/assets/images/trip/card3.png"}
              alt={`${value.title}`}
              width={50}
              height={50}
              className="h-[50px] w-[50px] rounded-full"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: () => <div className="font-dmSansMedium text-sm">Title</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
            onClick={() => router.push(`/admin/services/blog/${value.id}`)}
          >
            <span>{value.title}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="font-dmSansMedium text-sm">Date Published</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={` text-[14px] font-medium text-[#101828]`}>
            {standardDate(value.createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "viewBy",
      header: () => (
        <div className="font-dmSansMedium text-sm">Minutes Read</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={`text-[14px] font-medium text-[#101828]`}>
            {value.viewBy} Minutes
          </div>
        );
      },
    },
    {
      id: "delete",
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer text-[20px] font-medium text-[#F04438]`}
            onClick={() => deleteBlog(value.id)}
          >
            <RiDeleteBin6Line />
          </div>
        );
      },
    },
  ];

  const bannerColumns: ColumnDef<BannerPayment>[] = [
    {
      accessorKey: "image",
      header: () => <div className="font-dmSansMedium text-sm">Image</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
            onClick={() => router.push(`/admin/services/banner/${value.id}`)}
          >
            <Image
              src={value.image || "/assets/images/trip/card3.png"}
              alt={`${value.title}`}
              width={50}
              height={50}
              className="h-[50px] w-[50px] rounded-full"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: () => <div className="font-dmSansMedium text-sm">Title</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
            onClick={() => router.push(`/admin/services/banner/${value.id}`)}
          >
            <span>{value.title}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="font-dmSansMedium text-sm">Date Published</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
            onClick={() => router.push(`/admin/services/banner/${value.id}`)}
          >
            {standardDate(value.createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="font-dmSansMedium text-sm">Status</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
            onClick={() => router.push(`/admin/services/banner/${value.id}`)}
          >
            {value.status} Minutes
          </div>
        );
      },
    },
    {
      accessorKey: "link",
      header: () => <div className="font-dmSansMedium text-sm">Link</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
            onClick={() => router.push(`/admin/services/banner/${value.id}`)}
          >
            {value.ctaLink}
          </div>
        );
      },
    },
    {
      id: "delete",
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer text-[20px] font-medium text-[#F04438]`}
            onClick={() => deleteBanner(value.id)}
          >
            <RiDeleteBin6Line />
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="mx-[40px] mt-[40px]">
        <div>
          <Heading className=" mb-5 text-2xl text-[#101828]">Service</Heading>
          <div className="flex gap-5">
            <p
              className={`cursor-pointer text-[16px] font-bold ${
                outingType === "tour"
                  ? " border-b-2 border-[#0A83FF] px-3 pb-3 text-[#0A83FF]"
                  : ""
              }`}
              onClick={() => {
                setIsBlog(false);
                setOutingType("tour");
                setIsBanner(false);
              }}
            >
              Trip
            </p>
            <p
              className={`cursor-pointer text-[16px] font-bold ${
                outingType === "event"
                  ? " border-b-2 border-[#0A83FF] px-3 pb-3 text-[#0A83FF]"
                  : ""
              }`}
              onClick={() => {
                setIsBlog(false);
                setOutingType("event");
                setIsBanner(false);
              }}
            >
              Event
            </p>
            <p
              className={`cursor-pointer text-[16px] font-bold ${
                isBlog
                  ? " border-b-2 border-[#0A83FF] px-3 pb-3 text-[#0A83FF]"
                  : ""
              }`}
              onClick={() => {
                setOutingType("");
                setIsBlog(true);
                setIsBanner(false);
              }}
            >
              Blog
            </p>
            <p
              className={`cursor-pointer text-[16px] font-bold ${
                isBanner
                  ? " border-b-2 border-[#0A83FF] px-3 pb-3 text-[#0A83FF]"
                  : ""
              }`}
              onClick={() => {
                setOutingType("");
                setIsBlog(false);
                setIsBanner(true);
              }}
            >
              Banner
            </p>
          </div>
          {/* eslint-disable-next-line no-nested-ternary */}
          {isBlog ? (
            <div className="rounded-2xl bg-[#FFFFFF]">
              <div className="mt-10 flex justify-between  px-[12px] pt-10">
                <Heading type="h3">Blog</Heading>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-3xl border p-1 ">
                    <FaCalendarAlt />
                    <Text className="text-[12px] text-[#101828]">Date:</Text>
                    <Text className="text-[12px] text-[#667084]">All Time</Text>
                  </div>
                  <Link href="/admin/services/blog/new-blog">
                    <Button className="flex items-center gap-2 rounded-3xl text-[14px]">
                      <AiOutlinePlus /> New Blog
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="pt-6">
                <DataTable columns={blogColumns} data={blogData} />
                {blogSuccess && (
                  <Pagination
                    className="pagination-bar my-8"
                    currentPage={currentPageBlog}
                    totalCount={blogDetails?.totalElements}
                    pageLimit={pageLimit}
                    onPageChange={(v) => setCurrentPageBlog(v)}
                  />
                )}
              </div>
            </div>
          ) : isBanner ? (
            <div className="rounded-2xl bg-[#FFFFFF]">
              <div className="mt-10 flex justify-between  px-[12px] pt-10">
                <Heading type="h3">Banner</Heading>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-3xl border p-1 ">
                    <FaCalendarAlt />
                    <Text className="text-[12px] text-[#101828]">Date:</Text>
                    <Text className="text-[12px] text-[#667084]">All Time</Text>
                  </div>
                  <Link href="/admin/services/banner">
                    <Button className="flex items-center gap-2 rounded-3xl text-[14px]">
                      <AiOutlinePlus /> New Banner
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="pt-6">
                <DataTable columns={bannerColumns} data={bannerData} />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#FFFFFF]">
              <div className="mt-10 flex justify-between  px-[12px] pt-10">
                <Heading type="h3">All Trips</Heading>
                <div className="flex items-center gap-4">
                  {/* <div className="flex gap-3 rounded-3xl border p-1 text-[12px]">
                    <Text className="cursor-pointer rounded-3xl bg-[#EBF5FF] p-1 text-[#0A83FF]">
                      Private Trip
                    </Text>
                    <Text className="cursor-pointer rounded-3xl p-1">
                      Group Trip
                    </Text>
                  </div> */}
                  <div className="flex items-center gap-2 rounded-3xl border p-1 ">
                    <FaCalendarAlt />
                    <Text className="text-[12px] text-[#101828]">Date:</Text>
                    <Text className="text-[12px] text-[#667084]">All Time</Text>
                  </div>
                  <Button
                    className="flex items-center gap-2 rounded-3xl text-[14px]"
                    onClick={() => handleOpenOffCanvas("New Trip")}
                  >
                    <AiOutlinePlus /> New Trip
                  </Button>
                </div>
              </div>
              <div className="pt-6">
                <DataTable columns={columns} data={data} />
                {outingSuccess && (
                  <Pagination
                    className="pagination-bar my-8"
                    currentPage={currentPage}
                    totalCount={outingData?.totalElements}
                    pageLimit={pageLimit}
                    onPageChange={(v) => setCurrentPage(v)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        {newTrip && (
          <FormCanvas onClose={handleClose} title={activeForm} center>
            <div className="w-full rounded-3xl px-[1rem]">
              <div className="mt-[20px] flex gap-5">
                <p
                  className={`cursor-pointer rounded-md border px-2 py-1 font-dmSansRegular text-[14px] ${
                    payload.subType === "private"
                      ? "  bg-[#000000] text-[#ffffff]"
                      : ""
                  }`}
                  onClick={() => setPayload({ ...payload, subType: "private" })}
                >
                  Private Trip
                </p>
                <p
                  className={`cursor-pointer rounded-md border px-2 py-1 font-dmSansRegular text-[14px] ${
                    payload.subType === "group"
                      ? "  bg-[#000000] text-[#ffffff]"
                      : ""
                  }`}
                  onClick={() => setPayload({ ...payload, subType: "group" })}
                >
                  Group Trip
                </p>
              </div>
              <div className="my-[10px]">
                <Input
                  label="Trip Name"
                  placeholder="Enter the trip name"
                  value={payload.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPayload({ ...payload, name: event.target.value })
                  }
                />
                <div className="flex w-full gap-2">
                  <Input
                    label="Price"
                    type="number"
                    placeholder="Enter the Outing price"
                    value={payload.price}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPayload({ ...payload, price: event.target.value })
                    }
                    className="w-[195px]"
                  />
                  <Input
                    label="Default Duration"
                    type="number"
                    placeholder="Default Outing Duration in Days"
                    value={payload.defaultOutingDurationInDays}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPayload({
                        ...payload,
                        defaultOutingDurationInDays: event.target.value,
                      })
                    }
                    className="w-[205px]"
                  />
                </div>
                <TextArea
                  label="Descriptions"
                  placeholder="your placeholder here"
                  className="h-[135px]"
                  value={payload.description}
                  onChange={(event) =>
                    setPayload({
                      ...payload,
                      description: event.target.value,
                    })
                  }
                />
                <div className="flex gap-2">
                  <Input
                    label="Start Date"
                    placeholder="Select start date"
                    type="date"
                    value={payload.startDate}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPayload({
                        ...payload,
                        startDate: event.target.value,
                      })
                    }
                    className="w-[200px]"
                  />
                  <Input
                    label="End Date"
                    placeholder="Select end date"
                    value={payload.endDate}
                    type="date"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPayload({ ...payload, endDate: event.target.value })
                    }
                    className="w-[200px]"
                  />
                </div>
                <Input
                  placeholder="Enter payment limit in days"
                  type="number"
                  label="Payment Deadline"
                  value={payload.deadlineGap}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPayload({
                      ...payload,
                      deadlineGap: event.target.value,
                    })
                  }
                />
                <Button
                  className="mt-5 w-full rounded-3xl bg-[#0A83FF]"
                  onClick={handleCreateOuting}
                  disabled={
                    !payload.name || !payload.description || !payload.startDate
                  }
                >
                  Create {outingType === "tour" ? "Trip" : " Event"}
                </Button>
                {outingLoading && <FullPageLoader />}
              </div>
            </div>
          </FormCanvas>
        )}
      </div>
    </>
  );
};

export default Page;
