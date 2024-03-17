import "./admin.scss";

import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import Layout from "@/components/admin/layout/Layout";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Xcursions Admin dashboard",
};

export default function UnauthourizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = cookies().get("xcursions-token");
  const currentPage = headers().get("referer");

  if (!accessToken?.value) {
    redirect(
      !currentPage ? "/admin/login" : `/admin/login?clfrm=${currentPage}`
    );
  } else return <Layout>{children}</Layout>;
}
