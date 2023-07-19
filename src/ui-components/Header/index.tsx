import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";

import FullPageLoader from "@/components/lib/FullPageLoader";
import Input from "@/components/lib/Input/Input";
import { useLogoutUser } from "@/hooks";
import { useGetUserProfileQuery } from "@/services/user";

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

const NotificationList = ({ img = null, desc = "", datetime = "" }) => {
  return (
    <li>
      {img && <img src={"/assets/images/icons/profile_avatar.png"} alt="" />}
      <div className={styles["single-notification"]}>
        <p>{desc}</p>
        <p>{datetime}</p>
      </div>
    </li>
  );
};

const Header = ({ toggleSidebarMenu }: any) => {
  const { data, isSuccess } = useGetUserProfileQuery();
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
                count={4}
                screenCenter={false}
              >
                <div className={styles["notification-container"]}>
                  <div
                    className={`justify-sb flex ${styles["notification-header"]}`}
                  >
                    <h3>Notifications</h3>
                    <p style={{ color: "blue", fontWeight: "bold" }}>
                      Mark all as Read
                    </p>
                  </div>
                  <div className={styles["notification-body"]}>
                    <ul className={styles["notification-tabs"]}>
                      <li className={styles.active}>All</li>
                      <li>Following</li>
                      <li>Archeive</li>
                    </ul>
                    <ul className={styles["notification-tab"]}>
                      {[0, 1, 2].map((notification, i) => (
                        <NotificationList
                          key={i}
                          // @ts-ignore
                          img={`https://cdn.pixabay.com/photo/2017/03/19/20/19/ball-2157465__340.png`}
                          desc={"Jacob jone mwntion you in rewrite button tab"}
                          datetime={"1:12pm"}
                        />
                      ))}
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
              {isSuccess && data?.data?.fullName.split(" ")[0]}
            </p>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Header;
