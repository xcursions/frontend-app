import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

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
  status: any;
  amount: string;
  image: string;
};

const AllCustomers = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
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
        email: res?.email,
        id: res?.id,
        status: res?.suspended,
        createdAt: res.createdAt.split("T")[0],
        image:
          res?.profile?.avatarUrl || "/assets/images/icons/profile_avatar.jpeg",
      };
    });
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-lg font-semibold">Name</div>,
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
      accessorKey: "email",
      header: () => <div className="text-lg font-semibold">Email Address</div>,
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
      accessorKey: "createdAt",
      header: () => <div className="text-lg font-semibold">Date Joined</div>,
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
      accessorKey: "amount",
      header: () => <div className="text-lg font-semibold">Total Paid</div>,
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
      accessorKey: "status",
      header: () => <div className="text-lg font-semibold">Active</div>,
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
            onClick={() => deleteCustomerStatus(value.id)}
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
    </div>
  );
};

export default AllCustomers;
