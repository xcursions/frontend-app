// eslint-disable-next-line simple-import-sort/imports
import Avatar from "@/components/lib/Avatar";
import Logo from "@/components/lib/Logo";
import { useAppSelector } from "@/hooks";
import { useState } from "react";
import { MdMenu, MdArrowDropDown } from "react-icons/md";
import { VscBell } from "react-icons/vsc";
import { usePopper } from "react-popper";
import Menu from "./Menu";
import styles from "./Navbar.module.scss";
import SecNavBar from "./SecNavBar";

const profileImage = "/assets/images/icons/profile_avatar.png";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [{ name: "arrow" }],
      placement: "bottom-end",
    }
  );

  const onProfileClicked = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.logo__container}>
            <button className={styles.burger__container}>
              <MdMenu className={styles.burger} />
            </button>
            <Logo className={styles.logo} type="main" />
          </div>

          <div className={styles.actions}>
            {/* <RiSearchLine className={styles.actions__icon} /> */}
            <VscBell className={styles.actions__icon} />
            <button
              onClick={onProfileClicked}
              ref={setReferenceElement}
              className="flex"
            >
              <Avatar
                image={user?.profile?.avatarUrl || profileImage}
                // name={`${user?.first_name} ${user?.last_name}`}
                className={styles.actions__img}
              />
              <MdArrowDropDown className={styles.actions__arrow} />
            </button>

            <Menu
              {...{
                attributes,
                open,
                setOpen,
                setPopperElement,
                styles: popperStyles,
              }}
            />
          </div>
        </div>
      </nav>
      <div>
        <SecNavBar />
      </div>
    </>
  );
};

export default Navbar;
