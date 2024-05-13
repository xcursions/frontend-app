import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { HamburgerIcon } from "@/components/lib/Svg/HamburgerIcon2";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppConfig } from "@/constants";
import { useNavitemList } from "@/hooks";

export const SideNavBar = ({ hamburgerColor }: { hamburgerColor?: string }) => {
  const [open, setOpen] = useState(false);

  const navItemList = useNavitemList("sideNav");
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cod__side_nav_bar">
        <HamburgerIcon color={hamburgerColor} />
      </SheetTrigger>
      <SheetContent className="cod__side_nav_bar_content">
        <SheetHeader>
          <SheetTitle>
            <Image
              // className="mx-auto"
              src="/assets/images/landing-page/logo_white.png"
              width={120}
              height={53}
              priority
              alt={`${AppConfig.siteName} logo`}
            />
          </SheetTitle>
        </SheetHeader>
        <ul className="cod__side_nav_bar__nav_list">
          {navItemList.map((item) => (
            <li key={item.id}>
              <Link
                href={item.linkRef}
                className={`cod__side_nav_bar__nav_list_item${
                  item.linkRef === pathname ? " active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                target={item.external ? "_blank" : "_self"}
              >
                {item.linkTitle}
              </Link>
            </li>
          ))}
          <Link
            href={"/login"}
            className="cod__side_nav_bar__nav_list_item mt-10 min-h-[40px] w-full rounded-[1000px] bg-[#064F99]"
          >
            Sign In
          </Link>
        </ul>
      </SheetContent>
    </Sheet>
  );
};
