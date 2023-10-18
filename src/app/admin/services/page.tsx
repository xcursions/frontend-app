"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import Layout from "@/components/admin/layout/Layout";
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
  useDeleteBlogMutation,
  useDeleteOutingMutation,
  useGetBlogPostQuery,
  useLazyGetOutingsQuery,
} from "@/services/admin";
import type { BlogProps, OutingProps } from "@/types";

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
const Page = () => {
  const [newTrip, setNewTrip] = useState(false);
  const [isBlog, setIsBlog] = useState(false);
  const [outingType, setOutingType] = useState("tour");
  const [payload, setPayload] = useState(initialState);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageBlog, setCurrentPageBlog] = useState<number>(1);
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
  useEffect(() => {
    setPayload({ ...payload, type: outingType });
  }, [outingType]);
  const toggleModal = () => {
    setNewTrip(!newTrip);
  };
  useEffect(() => {
    getOuting(`?type=${outingType}&limit=${pageLimit}&page=${currentPage}`);
  }, [currentPage, pageLimit, outingType]);
  useEffect(() => {
    setCurrentPage(1);
  }, [outingType]);
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
        viewBy: res.viewCount,
        createdAt: res.createdAt.split("T")[0],
        bookedBy: res.bookingCount,
        image: res.outingGallery[0].image,
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
        image: res.blogFeaturedImage?.image,
      };
    });
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "trip",
      header: () => <div className="text-lg font-semibold">Trip</div>,
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
              height={44}
              className="h-[44px] w-[50px] rounded-2xl"
            />
            <span>{value.trip}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-lg font-semibold">Amount</div>,
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
      header: () => <div className="text-lg font-semibold">View by</div>,
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
      header: () => <div className="text-lg font-semibold">Date Created</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={` text-[14px] font-medium text-[#101828]`}>
            {value.createdAt}
          </div>
        );
      },
    },
    {
      accessorKey: "bookedBy",
      header: () => <div className="text-lg font-semibold">Booked by</div>,
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
      header: () => <div className="text-lg font-semibold">Image</div>,
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
              height={44}
              className="h-[44px] w-[50px] rounded-2xl"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: () => <div className="text-lg font-semibold">Title</div>,
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
      header: () => <div className="text-lg font-semibold">Date Published</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={` text-[14px] font-medium text-[#101828]`}>
            {value.createdAt}
          </div>
        );
      },
    },
    {
      accessorKey: "viewBy",
      header: () => <div className="text-lg font-semibold">Minutes Read</div>,
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

  return (
    <Layout>
      <div className="mx-[40px] mt-[40px]">
        <div>
          <Heading type="h2" className="mb-[20px]">
            Service
          </Heading>
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
              }}
            >
              Blog
            </p>
          </div>
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
          ) : (
            <div className="rounded-2xl bg-[#FFFFFF]">
              <div className="mt-10 flex justify-between  px-[12px] pt-10">
                <Heading type="h3">All Trips</Heading>
                <div className="flex items-center gap-4">
                  <div className="flex gap-3 rounded-3xl border p-1 text-[12px]">
                    <Text className="cursor-pointer rounded-3xl bg-[#EBF5FF] p-1 text-[#0A83FF]">
                      Private Trip
                    </Text>
                    <Text className="cursor-pointer rounded-3xl p-1">
                      Group Trip
                    </Text>
                  </div>
                  <div className="flex items-center gap-2 rounded-3xl border p-1 ">
                    <FaCalendarAlt />
                    <Text className="text-[12px] text-[#101828]">Date:</Text>
                    <Text className="text-[12px] text-[#667084]">All Time</Text>
                  </div>
                  <Button
                    className="flex items-center gap-2 rounded-3xl text-[14px]"
                    onClick={toggleModal}
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
          <>
            <div
              className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
              onClick={toggleModal}
            ></div>
            <div className="fixed inset-x-0 top-[40px] z-[32] flex items-center justify-center overflow-auto lg:left-[500px] lg:w-[450px]">
              <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                <div className="flex justify-between">
                  <Heading type="h3">New Trip</Heading>
                  <p
                    className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                    onClick={toggleModal}
                  >
                    X
                  </p>
                </div>
                <div className="mt-[20px] flex gap-5">
                  <p
                    className={`cursor-pointer rounded-md border px-2 py-1 font-dmSansRegular text-[14px] ${
                      payload.subType === "private"
                        ? "  bg-[#000000] text-[#ffffff]"
                        : ""
                    }`}
                    onClick={() =>
                      setPayload({ ...payload, subType: "private" })
                    }
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
                      !payload.name ||
                      !payload.description ||
                      !payload.startDate
                    }
                  >
                    Create {outingType === "tour" ? "Trip" : " Event"}
                  </Button>
                  {outingLoading && <FullPageLoader />}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Page;
