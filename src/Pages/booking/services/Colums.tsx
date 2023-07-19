"use client";

import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  status: string;
  amount: string;
  type: string;
  createdAt: any;
  bookingStatus: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
  },
  {
    accessorKey: "type",
  },
  {
    accessorKey: "status",
    header: "Payment Status",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Date ",
  },
  {
    accessorKey: "bookingStatus",
    header: "Booking Status",
  },
];
