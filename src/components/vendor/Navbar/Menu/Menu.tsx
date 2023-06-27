/* eslint-disable simple-import-sort/imports */
import FullPageLoader from "@/components/lib/FullPageLoader";
import Text from "@/components/lib/Text";
import { useAppSelector, useLogoutUser } from "@/hooks";
import type { FC } from "react";
import { useState } from "react";
import { MdCheck } from "react-icons/md";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import type MenuProps from "./MenuProps";

const Menu: FC<MenuProps> = ({
  open,
  setOpen,
  setPopperElement,
  styles: popperStyles,
  attributes,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const endUserSession = useLogoutUser();

  const handleLogout = () => {
    setIsLoading(true);
    endUserSession();
  };

  return (
    <>
      {open ? (
        <div
          ref={setPopperElement}
          style={popperStyles.popper}
          className={styles.container}
          onMouseLeave={() => setOpen(false)}
          {...attributes.popper}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex flex-col">
                <Text className="!font-soraBold">
                  {`${user?.profile?.fullName}`}
                </Text>
              </div>
            </div>

            <div className="bg-gradient flex h-4 w-4 items-center justify-center rounded-full">
              <MdCheck className="text-xs text-white" />
            </div>
          </div>

          <hr />

          <MenuItem url="/vendor/billing" className={styles.logout}>
            Edit Profile
          </MenuItem>

          <MenuItem url="/" className={styles.logout}>
            Go to Homepage
          </MenuItem>
          <MenuItem onClose={handleLogout} className={styles.logout}>
            Log Out
          </MenuItem>
        </div>
      ) : (
        <></>
      )}

      {isLoading && <FullPageLoader />}
    </>
  );
};

export default Menu;
