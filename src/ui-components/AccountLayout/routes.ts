/* eslint-disable import/no-anonymous-default-export */
import { BiUser } from "react-icons/bi";
import { BsChatSquareText } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { TbCalendarStats, TbCards } from "react-icons/tb";

export default [
  {
    to: "/user/account",
    name: "Edit Profile",
    Icon: BiUser,
  },
  {
    to: "/user/account/favourite",
    name: "Favourite",
    Icon: MdOutlineFavoriteBorder,
  },
  {
    to: "/user/account/schedule",
    name: "My Schedule",
    Icon: TbCalendarStats,
  },
  {
    to: "/user/account/payment",
    name: "Manage Payment",
    Icon: TbCards,
  },
  {
    to: "/user/account/chat",
    name: "Chat",
    Icon: BsChatSquareText,
  },
];
