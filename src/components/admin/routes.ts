/* eslint-disable import/no-anonymous-default-export */
import {
  IoCashOutline,
  IoChatbubbleOutline,
  IoGridOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TfiWallet } from "react-icons/tfi";

export default [
  {
    to: "/admin/dashboard",
    name: "Dashboard",
    Icon: IoHomeOutline,
  },
  {
    to: "/admin/services",
    name: "Services",
    Icon: TfiWallet,
  },
  {
    to: "/admin/bookings",
    name: "Bookings",
    Icon: IoGridOutline,
  },
  {
    to: "/admin/customers",
    name: "Customers",
    Icon: MdOutlineAccountCircle,
  },
  {
    to: "/admin/messages",
    name: "Messages",
    Icon: IoChatbubbleOutline,
  },
  {
    to: "/admin/transactions",
    name: "Transactions",
    Icon: IoCashOutline,
  },
  {
    to: "/admin/discount",
    name: "Discounts",
    Icon: IoCashOutline,
  },
  {
    to: "/admin/settings",
    name: "Settings",
    Icon: IoSettingsOutline,
  },
];
