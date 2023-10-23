import "../globals.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top 20 exotic vacation location around the world",
  description:
    "Book trips to exotic locations around the world, spend your vacation, holidays. Xcursions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
