import "./globals.scss";

import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { toastOptions } from "@/utils/config";

import { Providers } from "./GlobalRedux/provider";

export const metadata: Metadata = {
  title: "Xcursions",
  description:
    "Travel round the world with the best travel agents in Nigeria and experience, take a trip and create unforgettable memories",
  openGraph: {
    title: "Xcursions landing page",
    description:
      "Travel round the world with the best travel agents in Nigeria and experience, take a trip and create unforgettable memories",
    url: "https://xcursions.com.ng", // pending mark as canonical
    images: [
      {
        url: "/assets/images/landing-page/Landing_page_Header.png",
        width: 800,
        height: 600,
      },
      {
        url: "/assets/images/landing-page/testimonial1.jpeg",
        width: 1800,
        height: 1600,
        alt: "testimonies",
      },
      {
        url: "/assets/images/landing-page/testimonial2.jpeg",
        width: 1800,
        height: 1600,
        alt: "testimonies",
      },
      {
        url: "/assets/images/landing-page/testimonial3.jpeg",
        width: 1800,
        height: 1600,
        alt: "testimonies",
      },
      {
        url: "/assets/images/landing-page/testimonial4.jpeg",
        width: 1800,
        height: 1600,
        alt: "testimonies",
      },
    ],
    siteName: "Xcursions",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "Excursions",
    "Travel",
    "Events",
    "Tourists",
    "Amazing locations",
    "shows",
    "festivals",
    "Vacation",
  ],
  twitter: {
    card: "summary_large_image",
    title: "Xcursions",
    description:
      "Travel round the world with the best travel agents in Nigeria and experience, take a trip and create unforgettable memories",
    siteId: "",
    creator: "@xcursionsdotng",
    creatorId: "",
    images: ["/assets/images/landing-page/Landing_page_Header.png"],
  },
  icons: "/assets/images/icons/luggage.png",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" toastOptions={toastOptions} />
        </Providers>
      </body>
    </html>
  );
}
