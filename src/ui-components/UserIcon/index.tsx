/* eslint-disable import/extensions */
import Image from "next/image";

import { useGetUserQuery } from "@/services/user";

import styles from "./UserIcon.module.scss";

const profileImage = "/assets/images/icons/profile_avatar.jpeg";
const UserIcon = ({ onClick = () => {} }) => {
  const { data, isSuccess } = useGetUserQuery();
  return (
    <div onClick={onClick} className={styles.container}>
      <Image
        src={(isSuccess && data?.profile?.avatarUrl) || profileImage}
        width={"40"}
        height={"40"}
        alt={(isSuccess && data?.profile?.fullName) || "profile image"}
      />
    </div>
  );
};

export default UserIcon;
