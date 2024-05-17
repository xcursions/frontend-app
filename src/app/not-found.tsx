import Link from "next/link";

import Button from "@/components/lib/Button/Button";
import TopNavBar from "@/components/public/TopNavBar";

export default function NotFound() {
  return (
    <div className="bg-[#ffffff]">
      <TopNavBar />
      <div className="flex h-[100vh] items-center justify-center">
        <div className="text-center">
          <h1>404 - Page Not Found</h1>
          <p className="my-5"> The page you are looking for does not exist.</p>
          <Link href="/">
            <Button className="rounded-3xl">Go back to the home page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
