import { FiUser, FiLogOut } from "react-icons/fi";
import {
  AiOutlineFileText,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";

export const menuList = [
  {
    text: "Edit Profile",
    Icon: FiUser,
    href: "/user/account",
  },
  {
    text: "Go to HomePage",
    Icon: AiOutlineFileText,
    href: "/",
  },
  {
    text: "Logout",
    Icon: FiLogOut,
    href: "",
  },
];

export const headerLoginMenuList = [
  {
    text: "Login",
    Icon: AiOutlineLogin,
    href: "/login",
  },
  {
    text: "Signup",
    Icon: AiOutlineLogout,
    href: "/signup",
  },
];
