import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default function UnauthourizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = cookies().get("xcursions-token");
  const currentPage = headers().get("referer");

  if (!accessToken?.value) {
    redirect(!currentPage ? "/login" : `/login?clfrm=${currentPage}`);
  } else return children;
}
