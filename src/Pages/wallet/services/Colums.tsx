"use client";

import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  status: string;
  amount: string;
  createdAt: any;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Transaction Id",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Date ",
  },
];
