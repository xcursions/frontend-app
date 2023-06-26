import ProfileCard from "./ProfileCard";
import styles from "./SecNavbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className="order-1 max-w-[300px] flex-1 lg:order-2 lg:max-w-none lg:flex-initial">
          <ProfileCard />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
