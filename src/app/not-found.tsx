import Link from "next/link";

import Button from "@/components/lib/Button/Button";
import Navbar from "@/components/public/Navbar";

export default function NotFound() {
  return (
    <div className="bg-[#ffffff]">
      <Navbar text={"black"} logo={"black"} />
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
