import Link from "next/link";
import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FiFacebook } from "react-icons/fi";
import { TbBrandTwitter } from "react-icons/tb";

const Footer = () => {
  return (
    <div>
      <footer className=" bg-[#021A33] pt-5">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="flex flex-col items-center">
                <img
                  src="/assets/images/landing-page/Logo.png"
                  className="mr-3 h-8"
                  alt="Xcursions Logo"
                />
              </Link>
              <div className="mt-4 flex space-x-6 py-3 sm:mt-0 sm:justify-start">
                <a
                  href="#"
                  className="rounded-full bg-gray-700 p-2 text-gray-100"
                >
                  <FiFacebook className="text-xl" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-gray-700 p-2 text-gray-100"
                >
                  <BsInstagram className="text-xl" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-gray-700 p-2 text-gray-100"
                >
                  <TbBrandTwitter className="text-xl" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
              <div>
                <p className="mb-6 font-dmSansRegular text-[16px] uppercase text-white">
                  Company
                </p>
                <ul className="font-dmSansRegular text-[14px] text-gray-100">
                  <li className="mb-4">
                    <Link href="/trips" className="hover:underline">
                      Trips
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/blog" className="hover:underline">
                      Blogs
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/events" className="hover:underline">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:underline">
                      Company
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-6 font-dmSansRegular text-[16px] uppercase text-white">
                  Contact
                </p>
                <ul className="font-dmSansRegular text-[14px] text-gray-100">
                  <li className="mb-4">
                    <Link href="/contact-us" className="hover:underline ">
                      Contact Us
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/" className="hover:underline">
                      About Us
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/" className="hover:underline">
                      Faq
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-6 font-dmSansRegular text-[16px] uppercase text-white">
                  More
                </p>
                <ul className="font-dmSansRegular text-[14px] text-gray-100">
                  <li className="mb-4">
                    <Link href="/" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/" className="hover:underline">
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="py-5 font-dmSansMedium md:pl-[30%] lg:pl-[40%] ">
            <span className=" text-[14px] text-gray-100 ">
              © 2023{" "}
              <Link href="/" className="hover:underline">
                Xcursions. All Rights Reserved.
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
