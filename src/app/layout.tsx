import "./globals.scss";

import { Toaster } from "react-hot-toast";

import { toastOptions } from "@/utils/config";

import { Providers } from "./GlobalRedux/provider";

export const metadata = {
  title: "Xcursions",
  openGraph: {
    title: "Home page ",
    description:
      "Travel round the world with the best travel agents in Nigeria",
    url: "https://xcursions.com.ng/", // pending mark as canonical
    siteName: "Xcursions",
    locale: "en-US",
    type: "website",
  },
  keywords: [
    "Excursions",
    "Travel",
    "Tourists",
    "Amazing locations",
    "Vacation",
  ],
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
