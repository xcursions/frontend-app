/* eslint-disable import/no-extraneous-dependencies */

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

import styles from "./Navbar.module.scss";

type Props = {
  text: string;
  logo: string;
};

const Navbar = ({ text, logo }: Props) => {
  const [navbar, setNavbar] = useState(false);
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
              <Image
                src={
                  navbar
                    ? "/assets/images/landing-page/logo2.png" ||
                      "/assets/images/landing-page/Logo.png"
                    : icon
                }
                alt="Xcursion logo"
                width={100}
                height={300}
                className="h-[30px]"
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
                className={`${textColor} hover:text-2xl  hover:underline focus:underline`}
              >
                <Link href="/trips">Trips</Link>
              </li>
              <li
                className={`${textColor} hover:text-2xl hover:underline focus:underline`}
              >
                <Link href="/">Blog</Link>
              </li>
              <li
                className={`${textColor} hover:text-2xl  hover:underline focus:underline`}
              >
                <Link href="/">Contact Us</Link>
              </li>
              <li
                className={`${textColor} hover:text-2xl hover:underline focus:underline`}
              >
                <Link href="/">About US</Link>
              </li>
            </ul>
            {navbar && (
              <div className="mt-3 space-y-2 md:inline-block lg:hidden">
                <Link
                  href="/"
                  className="inline-block w-full rounded-3xl bg-white px-4 py-2 text-center text-gray-800 shadow hover:bg-gray-100"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="hidden items-center space-x-6 text-center md:flex">
          <div className="flex items-center">
            <BsSearch className={`text-xl font-extrabold ${textColor}`} />
          </div>
          <Link
            href="/"
            className={`flex items-center rounded-full px-4 py-2 ${buttonColor} shadow hover:bg-gray-100`}
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
