import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import Button from "@/components/lib/Button";
import Heading from "@/components/lib/Heading";
import { Pagination } from "@/components/lib/Pagination";
import { Switch } from "@/components/ui/switch";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import {
  useDeleteSingleCustomerMutation,
  useGetAllCustomersQuery,
  useUpdateSingleCustomerMutation,
} from "@/services/admin/users";
import type { IUser } from "@/types";

import { DataTable } from "../services/DataTable";
import styles from "./Customers.module.scss";

export type Payment = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  referral: string;
  status: any;
  amount: string;
  image: string;
  username: string;
};

const AllCustomers = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Payment>();
  const pageLimit = 10;
  const {
    data: customerData,
    isSuccess: isCustomerSuccess,
    isError: isCustomerError,
    error: customerError,
  } = useGetAllCustomersQuery({ pageLimit, currentPage });
  const [
    updateCustomerStatus,
    { isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError },
  ] = useUpdateSingleCustomerMutation();
  const [
    deleteCustomerStatus,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError },
  ] = useDeleteSingleCustomerMutation();

  useErrorHandler({
    isError: isUpdateError,
    error: updateError,
  });
  useErrorHandler({
    isError: isDeleteError,
    error: deleteError,
  });
  useSuccessHandler({
    isSuccess: isUpdateSuccess,
    showToast: true,
  });
  useSuccessHandler({
    isSuccess: isDeleteSuccess,
    showToast: true,
  });
  useErrorHandler({
    isError: isCustomerError,
    error: customerError,
  });
  const data =
    isCustomerSuccess &&
    customerData.result.map((res: IUser) => {
      return {
        name: res?.profile?.fullName,
        amount: res?.user_booking_info?.totalAmountPaid,
        username: res?.profile?.username,
        email: res?.email,
        id: res?.id,
        status: res?.suspended,
        referral: res?.userReferrals.length,
        createdAt: res?.createdAt.split("T")[0],
        image:
          res?.profile?.avatarUrl || "/assets/images/icons/profile_avatar.jpeg",
      };
    });
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = (id: string) => {
    deleteCustomerStatus(id);
  };
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-sm font-semibold">Name</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex cursor-pointer items-center gap-3 text-xs font-medium text-[#101828]`}
          >
            <Image
              src={value.image}
              alt={`${value.name}`}
              width={50}
              height={50}
              className="h-[50px] w-[50px] rounded-full"
            />
            <div className="flex flex-col font-dmSansMedium">
              <span>{value.name}</span>
              <span className="text-[#0A83FF]">@{value.username}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => <div className="text-sm font-semibold">Email Address</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={`text-[14px] font-medium text-[#101828]`}>
            {value.email}
          </div>
        );
      },
    },
    {
      accessorKey: "referral",
      header: () => (
        <div className="text-sm font-semibold">No of Referrals</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={` text-center text-[14px] font-medium text-[#101828]`}
          >
            {value.referral}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-sm font-semibold">Total Paid</div>,
      cell: ({ row }) => {
        const amount = parseInt(row.getValue("amount"), 10).toLocaleString();
        return (
          <div className="text-center text-[14px]  font-medium text-[#101828]">
            ₦{amount}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-sm font-semibold">Active</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            onClick={() =>
              updateCustomerStatus({
                query: value.id,
                data: { suspended: !value.status },
              })
            }
            className={`text-[14px] font-medium text-[#101828]`}
          >
            {value.status}
            <Switch checked={!value.status} />
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
            onClick={() => {
              setSelected(value);
              toggleModal();
            }}
          >
            <RiDeleteBin6Line />
          </div>
        );
      },
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card_body}>
          <DataTable columns={columns} data={data} />
        </div>
        {isCustomerSuccess && (
          <Pagination
            className="pagination-bar my-8"
            currentPage={currentPage}
            totalCount={customerData?.totalElements}
            pageLimit={pageLimit}
            onPageChange={(v) => setCurrentPage(v)}
          />
        )}
      </div>
      {isOpen ? (
        <>
          <div
            className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
            onClick={toggleModal}
          ></div>
          <div className="fixed inset-0 left-[30px] z-[32] flex w-[326px] items-center justify-center lg:left-[510px] lg:w-[430px]">
            <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
              <div className="flex justify-between">
                <Heading type="h3">
                  Are you sure you want to Delete this user?
                </Heading>
                <p
                  className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                  onClick={toggleModal}
                >
                  X
                </p>
              </div>
              <div className="mt-5 flex justify-between">
                <Button variant="outline" onClick={toggleModal}>
                  No
                </Button>
                <Button onClick={() => handleDelete(selected?.id || "")}>
                  Yes
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AllCustomers;
