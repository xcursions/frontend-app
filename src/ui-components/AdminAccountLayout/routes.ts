/* eslint-disable import/no-anonymous-default-export */
import { BiUser } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";

export default [
  {
    to: "/admin/settings",
    name: "Edit Profile",
    Icon: BiUser,
  },
  {
    to: "/admin/settings/teams",
    name: "Teams",
    Icon: RiTeamLine,
  },
];
