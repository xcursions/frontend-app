import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useWindowSize } from "./useWindowSize";

type InitHookOptions = "topNav" | "sideNav" | "all";
type NavigationItem = {
  id: string;
  linkRef: string;
  linkTitle: string;
  pageTitle: string;
  external?: boolean;
  pageTitleTag?: string;
  pageSubTitle?: string;
};

export const useNavitemList = (type: InitHookOptions): NavigationItem[] => {
  const { isTabletMdView } = useWindowSize();
  const router = useRouter();
  const topNavList: NavigationItem[] = [
    // {
    //   id: "sermon",
    //   linkRef: "/sermon/",
    //   linkTitle: "Sermon",
    //   pageTitle: "Sermon",
    // },
    {
      id: "visa",
      linkRef: "/visa",
      linkTitle: "Visa",
      pageTitle: "Visa",
      external: false,
    },
    {
      id: "trips",
      linkRef: "/trips",
      linkTitle: "Trips",
      pageTitle: "Trips",
    },
    {
      id: "events",
      linkRef: "/events",
      linkTitle: "Events",
      pageTitle: "Events",
    },
    {
      id: "blogs",
      linkRef: "/blog",
      linkTitle: "Blogs",
      pageTitle: "Blogs",
    },
  ];
  const sideNavList: NavigationItem[] = [
    ...(isTabletMdView && type !== "all"
      ? topNavList.filter((item) => item.id !== "logo")
      : []),
    {
      id: "flights",
      linkRef: "/flights",
      linkTitle: "Flights",
      pageTitle: "Flights",
    },
    // {
    //   id: "jnr-church",
    //   linkRef: "/junior-church/",
    //   linkTitle: "Junior Church",
    //   pageTitle: "Junior Church",
    // },
    // {
    //   id: "watch-media",
    //   linkRef: "https://www.youtube.com/@cityofdavidmedia/featured",
    //   linkTitle: "Watch/Media",
    //   pageTitle: "Media",
    //   external: true,
    // },
    // {
    //   id: "growth-inst",
    //   linkRef: "/growth-institute/",
    //   linkTitle: "Growth Institute",
    //   pageTitle: "Growth Institute",
    // },
    // {
    //   id: "sermon",
    //   linkRef: "/sermon/",
    //   linkTitle: "Sermon",
    //   pageTitle: "Sermon",
    // },
    // // {
    // //   id: "gallery",
    // //   linkRef: "https://cityofdavidatlantarccg.pixieset.com",
    // //   linkTitle: "Gallery",
    // //   pageTitle: "Gallery",
    // //   external: true,
    // // },
    // {
    //   id: "downloads",
    //   linkRef: "/downloads/",
    //   linkTitle: "Downloads",
    //   pageTitle: "Downloads",
    // },
    // {
    //   id: "house2house",
    //   linkRef: "/house-to-house/",
    //   linkTitle: "House to House",
    //   pageTitle: "House to House",
    // },
    // {
    //   id: "contact-us",
    //   linkRef: "/contact-us/",
    //   linkTitle: "Contact us",
    //   pageTitle: "Contact us",
    // },
  ];

  useEffect(() => {
    // Prefetch pages to load faster
    [...topNavList, ...sideNavList]
      .filter((item) => !!item.linkRef)
      .forEach((item) => router.prefetch(item.linkRef));
    router.prefetch("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-nested-ternary
  return type === "topNav"
    ? topNavList
    : type === "sideNav"
    ? sideNavList
    : [...topNavList, ...sideNavList];
};
