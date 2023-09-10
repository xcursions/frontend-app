import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";

import Button from "@/components/lib/Button/Button";
import FullPageLoader from "@/components/lib/FullPageLoader";
import Input from "@/components/lib/Input/Input";
import TimeDifference from "@/components/lib/TimeDifference/TimeDifference";
import { useAppSelector, useLogoutUser, useSuccessHandler } from "@/hooks";
import {
  useGetNotificationsQuery,
  useGetUserProfileQuery,
  useMarkNotificationMutation,
} from "@/services/user";

import { menuList } from "../../data";
import DropdownMenu from "../DropdownMenu";
import IconWrapper from "../IconWrapper";
import UserIcon from "../UserIcon";
import styles from "./Header.module.scss";

/*

Dropdown Menu Guideline and Instructions
Dropdown Menu props are
    label: string
    CustomMenu: React Component
    dropdownContainerStyle: style object
    children: React Component

    Note: label or CustomMenu only one can be used at a time
    CustomMenu has higher priority if CustomMenu has passed as
    props then label wont work but if CustomMenu has not given
    then label will be visible


*/
interface MenuListProps {
  href?: string;
  Icon?: React.ComponentType;
  text?: string;
}

const MenuList: React.FC<MenuListProps> = ({
  href = "",
  Icon = null,
  text = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const endUserSession = useLogoutUser();
  const handleLogout = () => {
    setIsLoading(true);
    endUserSession();
  };
  return (
    <li>
      <Link href={href} className={`${styles.link} flex items-center`}>
        {Icon && <Icon />}
        {text === "Logout" ? (
          <span onClick={handleLogout}>{text}</span>
        ) : (
          <span>{text}</span>
        )}
      </Link>
      {isLoading && <FullPageLoader />}
    </li>
  );
};

const NotificationsIcon = ({ onClick = () => {} }) => (
  <IconWrapper
    onClick={onClick}
    style={{
      top: "2px",
      fontSize: "20px",
    }}
  >
    <IoNotificationsOutline />
  </IconWrapper>
);

const NotificationList = ({ img, desc, datetime, id }: any) => {
  const [notificationId, setNotificationId] = useState("");
  const [markRead, { isSuccess }] = useMarkNotificationMutation();
  useSuccessHandler({
    isSuccess,
    showToast: true,
    toastMessage: "Notification marked as read",
  });
  useEffect(() => {
    if (notificationId) {
      markRead(notificationId);
    }
  }, [notificationId]);
  return (
    <li>
      {img && (
        <img src={img || "/assets/images/icons/profile_avatar.jpeg"} alt="" />
      )}
      <div
        className={styles["single-notification"]}
        onClick={() => setNotificationId(id)}
      >
        <p className="text-[12px] text-[#98A2B3]">{desc}</p>
        <div className="flex gap-3">
          <p className="text-[12px] text-[#0A83FF] underline">Mark as read</p>
          <p className="text-[12px] text-[#98A2B3]">{datetime}</p>
        </div>
      </div>
    </li>
  );
};

const Header = ({ toggleSidebarMenu }: any) => {
  const { data, isSuccess } = useGetUserProfileQuery();
  const { auth } = useAppSelector((state) => state.user);
  const { data: notificationData, isSuccess: notificationSuccess } =
    useGetNotificationsQuery("?limit=50");
  return (
    <>
      <section className={styles.container}>
        <div className={styles["left-items"]}>
          <ul>
            <li>
              <button
                className={styles["close-sidemenu"]}
                onClick={toggleSidebarMenu}
              >
                <HiOutlineMenuAlt1 />
              </button>
            </li>
            <li>
              <Input
                placeholder="Search for product here"
                className="w-[330px]"
              />
            </li>
          </ul>
        </div>
        <div className={styles["right-items"]}>
          <ul className={styles["header-navigations"]}>
            <li>
              <DropdownMenu
                // @ts-ignore
                CustomMenu={NotificationsIcon}
                // @ts-ignore
                count={
                  notificationData?.result.filter((res: any) => !res.isRead)
                    .length
                }
                screenCenter={false}
              >
                <div className={styles["notification-container"]}>
                  <div
                    className={`justify-sb flex ${styles["notification-header"]}`}
                  >
                    <h2 className="text-[18px] font-bold">Notifications</h2>
                  </div>
                  <div className={styles["notification-body"]}>
                    {/* <ul className={styles["notification-tabs"]}>
                      <li className={styles.active}>All</li>
                      <li>Following</li>
                      <li>Archeive</li>
                    </ul> */}
                    <ul className={styles["notification-tab"]}>
                      {notificationSuccess &&
                        notificationData.result
                          .filter((res: { isRead: any }) => !res.isRead)
                          .slice(0, 4)
                          .map((notification: any) => (
                            <NotificationList
                              key={notification.id}
                              // @ts-ignore
                              img={data?.data?.avatarUrl}
                              desc={notification.content}
                              id={notification.id}
                              datetime={
                                <TimeDifference
                                  createdAt={notification.createdAt}
                                />
                              }
                            />
                          ))}
                    </ul>
                    <ul>
                      <Button className="mt-3 w-full rounded-3xl">
                        view all
                      </Button>
                    </ul>
                  </div>
                </div>
              </DropdownMenu>
            </li>

            <li>
              {/* User Dropdown Menu */}
              <DropdownMenu
                // @ts-ignore
                label={"Dropdown 1"}
                // @ts-ignore
                CustomMenu={UserIcon}
                dropdownContainerStyle={
                  {
                    // padding: '15px 0'
                  }
                }
              >
                <ul className={styles["dropdown-menu"]}>
                  {menuList.map((menu, index) => (
                    <MenuList
                      key={index}
                      text={menu.text}
                      // @ts-ignore
                      Icon={menu.Icon}
                      href={menu.href}
                    />
                  ))}
                </ul>
              </DropdownMenu>
            </li>
            <p className="hidden font-dmSansRegular text-[14px] text-[#101828] lg:block">
              {auth === "regular-auth"
                ? isSuccess && data?.data?.username
                : isSuccess && data?.data?.lastName}
            </p>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Header;
