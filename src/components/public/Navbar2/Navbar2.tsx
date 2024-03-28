"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import Button from "@/components/lib/Button";
import { Collapsible } from "@/components/lib/Collapsible";
import { CancelIcon, HamburgerIcon } from "@/components/lib/Svg";
import { useAppSelector } from "@/hooks";

import styles from "./Navbar.module.scss";

const Navbar2 = () => {
  const [navbar, setNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const Pathname = usePathname();

  useEffect(() => {
    if (user) return setIsLoggedIn(true);
    return setIsLoggedIn(false);
  }, [user]);
  return (
    <nav
      className={`${styles.container} ${
        navbar ? "bg-[#0A83FF]" : "bg-[#ffffff]"
      }`}
    >
      <div className={styles.wrapper}>
        <div className={styles.lhs}>
          <Link href="/">
            <Image
              src={
                navbar
                  ? "/assets/images/landing-page/logo_white.png"
                  : "/assets/images/landing-page/logo_black.png"
              }
              alt="Xcursions Logo"
              width={117}
              height={25}
              className="h-fit w-full"
            />
          </Link>
          <ul className={styles.lhs_links}>
            <li
              className={`font-dmSansSemiBold txt-14 hover:underline focus:underline ${
                Pathname === "/visa" ? " text-[#0A83FF] underline" : ""
              }`}
            >
              <Link href="/visa">Visa</Link>
            </li>
            <li
              className={`font-dmSansSemiBold txt-14  hover:underline focus:underline ${
                Pathname === "/trips" ? " text-[#0A83FF] underline" : ""
              }`}
            >
              <Link href="/trips">Trips</Link>
            </li>
            <li
              className={`font-dmSansSemiBold txt-14  hover:underline focus:underline ${
                Pathname === "/events" ? " text-[#0A83FF] underline" : ""
              }`}
            >
              <Link href="/events">Events</Link>
            </li>
            <li
              className={`font-dmSansSemiBold txt-14  hover:underline focus:underline ${
                Pathname === "/blog" ? " text-[#0A83FF] underline" : ""
              }`}
            >
              <Link href="/blog">Blog</Link>
            </li>
            <li className="font-dmSansSemiBold">
              <Collapsible
                id="More"
                title="More"
                // wrapperClassName=" min-w-[52px]"
              >
                <Link href="/" className="mb-2 cursor-pointer">
                  <p>Custom Trips</p>
                </Link>
                <br />
                <Link href="/">
                  <p>Book Flights</p>
                </Link>
              </Collapsible>
            </li>
          </ul>
        </div>
        <div className={styles.rhs}>
          <div className="hidden items-center gap-1 md:flex">
            {/* <NigeriaIcon />
            <p className="txt-14 fw-500">NGN (₦) Naira</p> */}
            {isLoggedIn ? (
              <Link href={"/user/dashboard"}>
                <div className="flex items-center gap-1">
                  <Image
                    src={
                      user?.profile?.avatarUrl ||
                      "/assets/images/icons/profile_avatar.jpeg"
                    }
                    width={50}
                    height={50}
                    alt={user?.profile?.fullName || ""}
                    className="h-[50px] w-[50px] rounded-full"
                  />
                  <p className="txt-14 fw-400">My Account</p>
                </div>
              </Link>
            ) : (
              <div className="flex gap-2">
                <Link
                  href={"/login"}
                  className="rounded-[10000px] border border-[#0A83FF] px-3 text-[#0A83FF]"
                >
                  Login
                </Link>
                <Link href={"/signup"}>
                  <Button className="rounded-[10000px]">Signup</Button>
                </Link>
              </div>
            )}
          </div>
          <button
            onClick={() => setNavbar(!navbar)}
            className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400 md:hidden"
          >
            {navbar ? <CancelIcon color="#ffffff" /> : <HamburgerIcon />}
          </button>
        </div>
      </div>
      {/** Mobile View */}
      {navbar ? (
        <div className=" txt-white flex h-screen flex-col items-center justify-center gap-6 md:hidden">
          <Link href="/visa" className=" txt-white txt-28 fw-700">
            Visa
          </Link>
          <Link href="/trips" className=" txt-white txt-28 fw-700">
            Trips
          </Link>
          <Link href="/events" className=" txt-white txt-28 fw-700">
            Events
          </Link>
          <Link href="/blog" className=" txt-white txt-28 fw-700">
            Blog
          </Link>
          {/* <div className="flex gap-2">
            {" "}
            <NigeriaIcon />
            <p className="txt-14 fw-500">NGN (₦) Naira</p>
          </div> */}
          {isLoggedIn ? (
            <Link href={"/user/dashboard"}>
              <div className="flex items-center gap-1">
                <Image
                  src={
                    user?.profile?.avatarUrl ||
                    "/assets/images/icons/profile_avatar.jpeg"
                  }
                  width={50}
                  height={50}
                  alt={user?.profile?.fullName || ""}
                  className="h-[50px] w-[50px] rounded-full"
                />
                <p className="txt-24 fw-400">My Account</p>
              </div>
            </Link>
          ) : (
            <div className="flex w-full flex-col items-center gap-3">
              <Link
                href={"/login"}
                className=" m-auto flex min-h-[40px] w-full max-w-[80%] items-center justify-center rounded-[1000px] bg-white text-center text-[#0A83FF]"
              >
                Login
              </Link>
              <Link
                href={"/signup"}
                className=" m-auto flex min-h-[40px] w-full max-w-[80%] items-center justify-center rounded-[1000px] bg-[#064F99] text-center"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar2;
