import Link from "next/link";

import Layout from "@/components/admin/layout/Layout";
import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading";

export default function NotFound() {
  return (
    <Layout>
      <div className="bg-[#ffffff]">
        <div className="flex h-[100vh] items-center justify-center">
          <div className="text-center">
            <Heading>Coming Soon</Heading>
            <p className="my-5">
              {" "}
              The page you are looking for does not exist.
            </p>
            <Link href="/admin/dashboard">
              <Button className="rounded-3xl">
                Go back to Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
