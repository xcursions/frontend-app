/* eslint-disable import/no-anonymous-default-export */
import { IoGridOutline, IoHomeOutline } from "react-icons/io5";
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
    Icon: MdOutlineAccountCircle,
  },
  {
    to: "/admin/transactions",
    name: "Transactions",
    Icon: MdOutlineAccountCircle,
  },
  {
    to: "/admin/settings",
    name: "Settings",
    Icon: MdOutlineAccountCircle,
  },
];
