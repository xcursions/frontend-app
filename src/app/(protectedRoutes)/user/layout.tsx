import "./dashboard.scss";
import "react-day-picker/dist/style.css";

import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import Layout from "@/ui-components/layout";

export const metadata: Metadata = {
  title: "User dashboard",
  description: "Xcursions user dashboard",
};

export default function UnauthourizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = cookies().get("xcursions-token");
  const currentPage = headers().get("referer");

  if (!accessToken?.value) {
    redirect(!currentPage ? "/login" : `/login?clfrm=${currentPage}`);
  } else return <Layout>{children}</Layout>;
}
