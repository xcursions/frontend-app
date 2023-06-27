"use client";

// eslint-disable-next-line simple-import-sort/imports
import FullPageLoader from "@/components/lib/FullPageLoader";
import Navbar from "@/components/vendor/Navbar/Navbar";
import { useAppSelector, useAuth } from "@/hooks";
import type * as types from "@/types";
// import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./Vendor.module.scss";

const Vendor = ({ children }: types.ITemplateProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAuth(true);

  useEffect(() => {
    if (!user?.suspended && user?.profile?.id) {
      router.push("/user/dashboard");
    } else {
      router.push("/login");
    }
  }, [user]);

  return (
    <>
      {!isAuthenticated ? (
        <FullPageLoader />
      ) : (
        // <motion.div
        //   initial={{ opacity: 0.5, scale: 0 }}
        //   animate={{ opacity: 1, scale: 1, translateX: "0" }}
        //   exit={{ opacity: 0, translateX: "100vw" }}
        //   transition={{ duration: 0.5 }}
        //   className={styles.container}
        // >
        // </motion.div>
        <div>
          <Navbar />
          <main className={styles.main}>{children}</main>
        </div>
      )}
    </>
  );
};

export default Vendor;
