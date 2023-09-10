/* eslint-disable import/extensions */
/* eslint-disable dot-notation */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/lib/Logo';
import Image from 'next/image';
import styles from './SidebarNavigation.module.css';
import routes from '../../routes';

const SidebarNavigation = ({ sidebarMenuActive, toggleSidebarMenu }) => {
  const Pathname = usePathname();

  return (
    <section
      className={`${styles.container} ${
        sidebarMenuActive ? styles['active'] : ''
      }`}
    >
      <button
        className={styles['sidebar-close-btn']}
        onClick={toggleSidebarMenu}
      >
        x
      </button>
      <div className={styles['logo-container']}>
        <Logo type="white" />
      </div>
      <ul className={styles['sidebar-container']}>
        {routes.map((page, index) => (
          <li
            key={index}
            className={`${styles['sidebar-menu-item']} ${
              Pathname === page.to ? styles['active'] : ''
            }`}
          >
            <Link href={page.to}>
              <page.Icon />
              <span>{page.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className={styles['sidebar-footer']}>
        {/* <button onClick={toggleSidebarMenu}>close</button> */}
        <li className={styles['footer-item']}>
          <Image
            width={250}
            height={241}
            src="/assets/images/Ad.png"
            alt="advert"
            className="mx-auto mb-3 max-h-[241px]"
            priority={false}
          />
        </li>
      </ul>
    </section>
  );
};

export default SidebarNavigation;
