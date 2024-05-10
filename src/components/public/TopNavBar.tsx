"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

import { NigeriaIcon } from "@/components/lib/Svg";
import { AppConfig } from "@/constants";
import { useAppSelector, useNavitemList } from "@/hooks";

import { Collapsible } from "../lib/Collapsible";
import { Button } from "../ui/button";
import { SideNavBar } from "./SideNavBar";

const TopNavBar = () => {
  const [inView, setInView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const navItemList = useNavitemList("topNav");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight =
        document.getElementById("lead_page_banner")?.offsetHeight ?? 0;
      const scrollTop = window.scrollY;
      setInView(scrollTop > bannerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user) return setIsLoggedIn(true);
    return setIsLoggedIn(false);
  }, [user]);

  return (
    <>
      <div className={`cod__top_nav_bar${pathname === "/" ? " base" : ""}`}>
        <nav className="cod__top_nav_bar__nav_list">
          <Link href="/" className=" lg:mr-10">
            <Image
              src={AppConfig.appLogoUrl}
              width={120}
              height={53}
              priority
              alt={`${AppConfig.siteName} logo`}
            />
          </Link>
          {navItemList.map((navItem) => (
            <Link
              href={navItem.linkRef}
              key={navItem.id}
              target={navItem.external ? "_blank" : undefined}
              className={`cod__top_nav_bar__nav_list_item${
                navItem.linkRef === pathname ? " active" : ""
              }`}
            >
              {navItem.linkTitle}
            </Link>
          ))}
          <div className="cod__top_nav_bar__nav_list_item">
            <Collapsible
              id="More"
              title="More"
              // wrapperClassName=" min-w-[52px]"
            >
              <Link
                href="/custom-trip"
                className={`cod__top_nav_bar__nav_list_item${
                  pathname === "/custom-trip" ? " active" : ""
                }`}
              >
                <p>Custom Trips</p>
              </Link>
              <br />
              <Link
                href="/custom-trip"
                className={`cod__top_nav_bar__nav_list_item${
                  pathname === "/flights" ? " active" : ""
                }`}
              >
                <p>Book Flights</p>
              </Link>
            </Collapsible>
          </div>
        </nav>
        <div className="cod__top_nav_bar__nav_list_item">
          {isLoggedIn ? (
            <div className=" flex items-center gap-3">
              <Link href="/user/account/favourite">
                <div className=" flex items-center gap-1">
                  <AiOutlineHeart />
                  Favourite
                </div>
              </Link>

              <Link href="/user/wallet">
                <div className=" flex cursor-pointer items-center gap-1">
                  <NigeriaIcon />
                  <p className="txt-14 fw-500">NGN</p>
                </div>
              </Link>

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
                  {/* <p className="txt-14 fw-400">My Account</p> */}
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href={"/login"}>
                <Button className="rounded-[10000px]">Sign In</Button>
              </Link>
            </div>
          )}
        </div>
        <div className=" flex md:hidden">
          <SideNavBar hamburgerColor="#000" />
        </div>
      </div>

      <div
        className={`cod__top_nav_bar inview${
          // eslint-disable-next-line no-nested-ternary
          pathname !== "/" ? " notBase" : inView ? " reveal_nav" : ""
        }`}
      >
        <nav className="cod__top_nav_bar__nav_list">
          <Link href="/" className=" lg:mr-10">
            <Image
              src="/assets/images/landing-page/logo_black.png"
              width={120}
              height={53}
              priority
              alt={`${AppConfig.siteName} logo`}
            />
          </Link>
          {navItemList.map((navItem) => (
            <Link
              href={navItem.linkRef}
              key={navItem.id}
              target={navItem.external ? "_blank" : undefined}
              className={`cod__top_nav_bar__nav_list_item${
                navItem.linkRef === pathname ? " active" : ""
              }`}
            >
              {navItem.linkTitle}
            </Link>
          ))}
          <div className="cod__top_nav_bar__nav_list_item">
            <Collapsible id="More" title="More">
              <Link
                href="/custom-trip"
                className={`cod__top_nav_bar__nav_list_item${
                  pathname === "/custom-trip" ? " active" : ""
                }`}
              >
                <p>Custom Trips</p>
              </Link>
              <br />
              <Link
                href="/custom-trip"
                className={`cod__top_nav_bar__nav_list_item${
                  pathname === "/flights" ? " active" : ""
                }`}
              >
                <p>Book Flights</p>
              </Link>
            </Collapsible>
          </div>
        </nav>
        <div className="cod__top_nav_bar__nav_list_item">
          {isLoggedIn ? (
            <div className=" flex items-center gap-3">
              <Link href="/user/account/favourite">
                <div className=" flex items-center gap-1">
                  <AiOutlineHeart />
                  Favourite
                </div>
              </Link>
              <Link href="/user/wallet">
                <div className=" flex cursor-pointer items-center gap-1">
                  <NigeriaIcon />
                  <p className="txt-14 fw-500">NGN</p>
                </div>
              </Link>

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
                  {/* <p className="txt-14 fw-400">My Account</p> */}
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href={"/login"}>
                <Button className="rounded-[10000px]">Sign In</Button>
              </Link>
            </div>
          )}
        </div>

        <div className=" flex md:hidden">
          <SideNavBar hamburgerColor="#000" />
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
