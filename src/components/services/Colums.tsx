"use client";

import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  price: string;
  name: "";
  viewBy: string;
  createdAt: string;
  bookedBy: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Trip",
  },
  {
    accessorKey: "price",
    header: "Prices",
  },
  {
    accessorKey: "viewBy",
    header: "View by",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    accessorKey: "bookedBy",
    header: "Booked by",
  },
];
