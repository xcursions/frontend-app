import "./dashboard.scss";
import "react-day-picker/dist/style.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User dashboard",
  description: "Xcursions user dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
