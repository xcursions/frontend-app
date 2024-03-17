import "../../globals.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top 20 exotic vacation location around the world",
  description:
    "Book trips to exotic locations around the world, spend your vacation, holidays. Xcursions",
  openGraph: {
    title: "Top 20 exotic vacation location around the world",
    description:
      "Book trips to exotic locations around the world, spend your vacation, holidays. Xcursions",
    url: "https://xcursions.com.ng/trips", // pending mark as canonical
    images: [
      {
        url: "/assets/images/trip/trip_header.png",
        width: 800,
        height: 600,
      },
    ],
    siteName: "Xcursions",
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
