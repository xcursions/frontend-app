/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import "./styles/main.scss";

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

// import Whatsapp from "@/components/lib/Whatsapp";
import { FacebookPixelEvents } from "@/components/pixelEvent/pixelEvent";
import { toastOptions } from "@/utils/config";

import { Providers } from "./GlobalRedux/provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmSans",
  display: "swap",
  weight: "400",
});
export const metadata: Metadata = {
  title: "Xcursions",
  description:
    "Travel round the world with the best travel agents in Nigeria and experience, take a trip and create unforgettable memories",
  manifest: "/manifest.json",
  icons: { apple: "/icon.png" },
  themeColor: "#ffffff",
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
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
      />
      <Script
        id="g_tag"
        dangerouslySetInnerHTML={{
          __html: `  window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config','${process.env.NEXT_PUBLIC_GTAG}', {
          page_path: window.location.pathname,
        })`,
        }}
      />
      <body className={`${dmSans.variable}`}>
        <Providers>
          {children}
          <Suspense>
            <FacebookPixelEvents />
          </Suspense>
          {/* <Whatsapp /> */}
          <Toaster position="top-right" toastOptions={toastOptions} />
        </Providers>
      </body>
    </html>
  );
}
