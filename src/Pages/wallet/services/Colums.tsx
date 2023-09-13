// @ts-nocheck

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  status: string;
  amount: string;
  createdAt: any;
  nature: string;
};

export const columns: ColumnDef<Payment>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: () => <div className="text-lg font-semibold">Transaction Id</div>,
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <div className="max-w-[90px] truncate text-[14px] font-medium text-[#101828]">
          {id}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-lg font-semibold">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div
          className={`w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium text-[#101828] ${
            status === "successful"
              ? "bg-[#E6FAF0] text-[#12B76A]"
              : "bg-[#FFECEB] text-[#F04438]"
          }`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-lg font-semibold">Amount</div>,
    cell: ({ row }) => {
      const amount = parseInt(row.getValue("amount"), 10).toLocaleString();
      const nature = row.getValue("nature");
      return (
        <div className="text-[14px] font-medium text-[#101828]">
          {nature === "credit" ? "+" : "-"} ₦{amount}
        </div>
      );
    },
  },
  {
    accessorKey: "nature",
    header: () => <div className="text-lg font-semibold ">Type</div>,
    cell: ({ row }) => {
      const payment = row.getValue("nature");
      return (
        <div
          className={` w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium ${
            payment === "credit"
              ? "bg-[#E6FAF0] text-[#12B76A]"
              : "bg-[#FFECEB] text-[#F04438]"
          }`}
        >
          {payment}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-lg font-semibold">Date</div>,
    cell: ({ row }) => {
      const status = row.getValue("createdAt");
      return (
        <div className={`text-[14px] font-medium text-[#101828]`}>{status}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
