import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default function UnauthourizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = cookies().get("xcursions-token");
  const referer = headers().get("referer");
  const redirectFrom = referer
    ? new URL(referer).searchParams.get("clfrm")
    : undefined;

  if (accessToken?.value) {
    redirect(`${redirectFrom || "/user/dashboard"}`);
  }
  return children;
}
