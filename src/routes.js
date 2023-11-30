/* eslint-disable import/no-anonymous-default-export */
import { IoGridOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TfiWallet } from "react-icons/tfi";

export default [
  {
    to: "/user/dashboard",
    name: "Dashboard",
    Icon: IoHomeOutline,
  },
  {
    to: "/user/wallet",
    name: "Wallet",
    Icon: TfiWallet,
  },
  {
    to: "/user/booking",
    name: "Bookings",
    Icon: IoGridOutline,
  },
  {
    to: "/user/account",
    name: "Account",
    Icon: MdOutlineAccountCircle,
  },
];
