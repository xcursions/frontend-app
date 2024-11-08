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
  if (accessToken?.value && redirectFrom) {
    redirect(`${redirectFrom || "/user/dashboard"}`);
  } else if (accessToken?.value) {
    redirect("/user/dashboard");
  }
  return children;
}
