import type { ColumnDef } from "@tanstack/react-table";
import { toPng } from "html-to-image";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import toaster from "react-hot-toast";

import Button from "@/components/lib/Button";
import { DownloadIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import {
  useGetActiveUsersQuery,
  useGetAllBookingQuery,
  useGetAllTransactionQuery,
  useGetMostBookedTripsQuery,
  useGetTopCustomersQuery,
  useGetTransactionVolumeQuery,
} from "@/services/admin/transaction";
import type { IUser, OutingProps } from "@/types";

import { DataTable } from "../services/DataTable";
import styles from "./Dashboard.module.scss";
import LineChart from "./LineChart";

export type Payment = {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  amount: string;
  paymentMethod: string;
  image: string;
};

const TransactionDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [topCustomers, setTopCustomers] = useState<IUser[]>([]);
  const [mostBooked, setMostBooked] = useState<OutingProps[]>([]);
  const {
    data: transactionVolume,
    isError: isTransactionError,
    error: transactionError,
  } = useGetTransactionVolumeQuery();
  const { data: bookingData } = useGetAllBookingQuery({
    pageLimit: 10,
    currentPage: 1,
  });
  const { data: mostBookedData, isSuccess: isMostBookedSuccess } =
    useGetMostBookedTripsQuery();
  const { data: activeUsersData, isSuccess: isActiveUsersSuccess } =
    useGetActiveUsersQuery();
  const { data: transactionHistory, isSuccess: isTransactionHistorySuccess } =
    useGetAllTransactionQuery({ pageLimit: 10, currentPage: 1 });
  const { data: topCustomersData, isSuccess: isTopCustomersSuccess } =
    useGetTopCustomersQuery();
  useSuccessHandler({
    isSuccess: isActiveUsersSuccess,
    showToast: false,
    successFunction: () => {
      setUsers(activeUsersData?.result);
    },
  });
  useSuccessHandler({
    isSuccess: isTopCustomersSuccess,
    showToast: false,
    successFunction: () => {
      setTopCustomers(topCustomersData?.result);
    },
  });
  useSuccessHandler({
    isSuccess: isMostBookedSuccess,
    showToast: false,
    successFunction: () => {
      setMostBooked(mostBookedData?.result);
    },
  });
  useErrorHandler({
    isError: isTransactionError,
    error: transactionError,
  });
  const sortedUsers = [...users].sort(
    (a, b) =>
      parseFloat(b.user_booking_info?.totalAmountPaid) -
      parseFloat(a.user_booking_info?.totalAmountPaid)
  );

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        toaster.error(err);
      });
  }, [ref]);

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-lg font-semibold">Name/Email</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
          >
            <Image
              src={value.image}
              alt={`${value.name}`}
              width={50}
              height={44}
              className="h-[44px] w-[50px] rounded-2xl"
            />
            <span>{value.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: () => <div className="text-lg font-semibold">Transaction ID</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={`text-[14px] font-medium text-[#101828]`}>
            {value.id}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-lg font-semibold">Status</div>,
      cell: ({ row }) => {
        const value = row.original;
        const status = row.getValue("status");
        return (
          <div
            className={`w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium text-[#101828] ${
              status === "successful"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
          >
            {value.status}
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
      accessorKey: "createdAt",
      header: () => <div className="text-lg font-semibold">Date</div>,
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
      accessorKey: "paymentMethod",
      header: () => <div className="text-lg font-semibold">Payment Type</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={` text-[14px] font-medium text-[#101828]`}>
            {value.paymentMethod === "credit" ? "Deposit" : "Booking"}
          </div>
        );
      },
    },
    {
      id: "download",
      cell: () => {
        return (
          <>
            <div
              className={`cursor-pointer text-[20px] font-medium text-[#F04438]`}
              onClick={() => onButtonClick()}
            >
              <DownloadIcon />
            </div>
          </>
        );
      },
    },
  ];
  const data =
    isTransactionHistorySuccess &&
    transactionHistory.result
      .slice(0, 6)
      // .filter((item) => item.outing !== null)
      .map((res: any) => {
        return {
          name: res?.user?.email,
          amount: res?.amount,
          id: res?.id,
          status: res?.status,
          createdAt: res?.createdAt.split("T")[0],
          paymentMethod: res?.nature,
          image: "/assets/images/icons/profile_avatar.jpeg",
        };
      });
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.grid_container}>
          <div className="flex gap-[24px]">
            <div className={styles.card_body}>
              <div className="m-[24px]">
                <Text className=" font-dmSansRegular text-sm text-[#667084]">
                  Transaction Volume
                </Text>
                <Text className=" font-dmSansBold text-3xl text-[#021A33]">
                  ₦
                  {parseInt(
                    transactionVolume?.transactionVolume,
                    10
                  ).toLocaleString()}
                </Text>
              </div>
            </div>
            <div className={styles.card_body}>
              <div className="m-[24px]">
                <Text className=" font-dmSansRegular text-sm text-[#667084]">
                  Total Active Customers
                </Text>
                <Text className=" font-dmSansBold text-3xl text-[#021A33]">
                  {transactionVolume?.totalActiveCustomers.toLocaleString()}
                </Text>
              </div>
            </div>
          </div>
          <div className={styles.card_body}>
            <div className="m-[24px]">
              <Text className=" font-dmSansRegular text-sm text-[#667084]">
                Total Bookings
              </Text>
              <Text className=" font-dmSansBold text-3xl text-[#021A33]">
                {bookingData?.totalElements}
              </Text>
            </div>
          </div>
        </div>
        <div className={styles.grid_container}>
          <div className={styles.card_body}>
            <div className="m-[24px]">
              <Text className=" font-dmSansBold text-lg text-[#021A33]">
                Earnings
              </Text>
              <LineChart />
            </div>
          </div>

          <div className={styles.card_body}>
            <div className=" p-[24px]">
              <Text className=" font-dmSansBold text-lg text-[#021A33]">
                Active Users
              </Text>
            </div>
            <hr />
            <div className="m-[24px]">
              <div className="mt-3 flex flex-col gap-3">
                {users?.length &&
                  sortedUsers?.slice(0, 5)?.map((user) => (
                    <div
                      key={user.id}
                      className=" flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          // width={40}
                          // height={40}
                          src={
                            user?.profile?.avatarUrl ||
                            "/assets/images/icons/profile_avatar.jpeg"
                          }
                          className=" h-[40px] w-[40px] rounded-full"
                          alt={user?.profile?.fullName}
                        />
                        <div>
                          <Text className=" font-dmSansBold text-xs text-[#021A33]">
                            {user?.profile?.fullName}
                          </Text>
                          <Text className="text-xs text-[#667084]">
                            {user?.user_booking_info?.totalTour}{" "}
                            {parseFloat(user?.user_booking_info?.totalTour) > 1
                              ? "trips"
                              : "trip"}
                          </Text>
                        </div>
                      </div>
                      {/* <BiMessageDetail className=""/> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_2942_81694)">
                          <path
                            d="M6.66663 7.5H13.3333"
                            stroke="#0A83FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.66663 10.833H11.6666"
                            stroke="#0A83FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.5 14.9997H5C4.33696 14.9997 3.70107 14.7363 3.23223 14.2674C2.76339 13.7986 2.5 13.1627 2.5 12.4997V5.83301C2.5 5.16997 2.76339 4.53408 3.23223 4.06524C3.70107 3.5964 4.33696 3.33301 5 3.33301H15C15.663 3.33301 16.2989 3.5964 16.7678 4.06524C17.2366 4.53408 17.5 5.16997 17.5 5.83301V12.4997C17.5 13.1627 17.2366 13.7986 16.7678 14.2674C16.2989 14.7363 15.663 14.9997 15 14.9997H12.5L10 17.4997L7.5 14.9997Z"
                            stroke="#0A83FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2942_81694">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  ))}
              </div>
              <Link href="/admin/customers">
                <Button
                  variant="outline"
                  className="mt-3 w-full rounded-[100px]"
                >
                  View all Users
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.grid_container}>
          <div className={styles.card_body}>
            <div className=" p-[24px]">
              <Text className=" font-dmSansBold text-lg text-[#021A33]">
                Top Customer
              </Text>
            </div>
            <hr />
            <div className="m-[24px]">
              <div className="mt-3 flex flex-col  gap-3">
                {topCustomers.length &&
                  topCustomers.slice(0, 3).map((customer) => (
                    <div
                      key={customer.id}
                      className=" flex items-center justify-between rounded-[16px]  border p-[24px]"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          width={54}
                          height={54}
                          src={
                            customer?.profile?.avatarUrl ||
                            "/assets/images/icons/profile_avatar.jpeg"
                          }
                          className=" h-[54px] w-[54px] rounded-full"
                          alt={customer?.profile?.fullName}
                        />
                        <div>
                          <Text className=" font-dmSansBold text-lg text-[#021A33]">
                            {customer?.profile?.fullName}
                          </Text>
                          <Text className="text-xs text-[#667084]">
                            {customer?.email}
                          </Text>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Text className="rounded-[100px] bg-[#F5EBFF] px-2 py-1 font-dmSansBold text-xs text-[#500699]">
                          {customer?.user_booking_info?.totalTour} Trips
                        </Text>
                        <Text className="rounded-[100px] bg-[#EBF5FF] px-2 py-1 font-dmSansBold text-xs text-[#064F99]">
                          {customer?.user_booking_info?.totalEvent} Events
                        </Text>
                        <Text className="rounded-[100px] bg-[#FFF5EB] px-2 py-1 font-dmSansBold text-xs text-[#995006]">
                          ₦
                          {parseInt(
                            customer?.user_booking_info?.totalAmountPaid || "",
                            10
                          ).toLocaleString()}{" "}
                          Paid
                        </Text>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className={styles.card_body}>
            <div className=" p-[24px]">
              <Text className=" font-dmSansBold text-lg text-[#021A33]">
                Most Booked Trip
              </Text>
            </div>
            <hr />
            <div className="m-[24px]">
              <div className="mt-3 flex flex-col gap-4">
                {mostBooked.length &&
                  mostBooked.slice(0, 5).map((booked) => (
                    <div
                      key={booked.id}
                      className=" flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={booked?.outingGallery[0]?.image}
                          className=" h-[54px] w-[54px] rounded-full"
                          alt={booked?.name}
                        />
                        <div>
                          <Text className=" font-dmSansBold text-[14px] text-[#021A33]">
                            {booked?.name}
                          </Text>
                          <Text className="text-[14px] text-[#667084]">
                            {booked?.uniqueBookingCount}{" "}
                            {booked?.uniqueBookingCount > 1
                              ? "customers"
                              : "customer"}
                          </Text>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  ))}
              </div>
              <Link href="/admin/services">
                <Button
                  variant="outline"
                  className="mt-3 w-full rounded-[100px]"
                >
                  View all Trips
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <div className={styles.card_body}>
            <div className=" px-[24px] pt-[24px]">
              <Text className=" font-dmSansBold text-xl text-[#021A33]">
                Transaction History
              </Text>
            </div>
            <div className="pt-6" ref={ref}>
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDashboard;
