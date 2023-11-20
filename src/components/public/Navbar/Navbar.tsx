"use client";

// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

import { useAppSelector } from "@/hooks";

import styles from "./Navbar.module.scss";

type Props = {
  text: string;
  logo: string;
};

const Navbar = ({ text, logo }: Props) => {
  const [navbar, setNavbar] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const Pathname = usePathname();
  const textColor = text === "black" ? "text-[ #475467]" : "text-white";
  const color = navbar ? "bg-[#0A83FF]" : " ";
  const icon =
    logo === "black"
      ? "/assets/images/landing-page/logo_black.png"
      : "/assets/images/landing-page/Logo.png";
  const buttonColor =
    text === "black" ? "bg-[#0A83FF] text-white" : "bg-white text-[#0A83FF] ";
  return (
    <nav
      className={`${styles["nav__backdrop-filter"]} ${color} absolute z-30 w-full `}
    >
      <div className={styles.nav__container}>
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <Link href="/">
              <img
                src={
                  navbar
                    ? "/assets/images/landing-page/logo2.png" ||
                      "/assets/images/landing-page/Logo.png"
                    : icon
                }
                alt="Xcursion logo"
                // width={100}
                // height={300}
                className="h-[26px] w-[113px] lg:h-[30px] lg:w-[133px]"
              />
            </Link>

            <div className="md:hidden">
              <button
                className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${textColor} h-6 w-6 `}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li
                className={`${textColor} hover:text-xl  hover:underline focus:underline ${
                  Pathname === "/trips"
                    ? "text-lg text-[#0A83FF] underline"
                    : ""
                }`}
              >
                <Link href="/trips">Trips</Link>
              </li>
              <li
                className={`${textColor} hover:text-xl hover:underline focus:underline ${
                  Pathname === "/blog" ? "text-lg text-[#0A83FF] underline" : ""
                }`}
              >
                <Link href="/blog">Blog</Link>
              </li>
              <li
                className={`${textColor} hover:text-xl  hover:underline focus:underline ${
                  Pathname === "/contact-us"
                    ? "text-lg text-[#0A83FF] underline"
                    : ""
                }`}
              >
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li
                className={`${textColor} hover:text-xl hover:underline focus:underline ${
                  Pathname === "/about-us"
                    ? "text-lg text-[#0A83FF] underline"
                    : ""
                }`}
              >
                <Link href="/about-us">About Us</Link>
              </li>
            </ul>
            {navbar &&
              (user ? (
                <div className="mt-3 space-y-2 md:hidden">
                  <Link
                    href="/user/dashboard"
                    className="inline-block w-full rounded-3xl bg-white px-4 py-2 text-center text-gray-800 shadow"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <div className="mt-3 space-y-2 md:hidden">
                  <Link
                    href="/login"
                    className={`${textColor} flex items-center px-4 py-2`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-block w-full rounded-3xl bg-white px-4 py-2 text-center text-gray-800 shadow"
                  >
                    Sign up
                  </Link>
                </div>
              ))}
          </div>
        </div>

        {user ? (
          <div className="hidden items-center space-x-6 text-center md:flex">
            <Link
              href="/user/dashboard"
              className={`flex items-center rounded-full px-4 py-2 ${buttonColor} shadow`}
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="hidden items-center space-x-6 text-center md:flex">
            <div className="flex items-center">
              <BsSearch className={`text-xl font-extrabold ${textColor}`} />
            </div>
            <Link
              href="/login"
              className={`${textColor} flex items-center px-4 py-2`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`flex items-center rounded-full px-4 py-2 ${buttonColor} shadow`}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
