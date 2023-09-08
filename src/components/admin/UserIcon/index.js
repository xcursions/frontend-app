/* eslint-disable import/extensions */
import Image from 'next/image';
import { useAppSelector } from '@/hooks';
import styles from './UserIcon.module.css';

const profileImage = '/assets/images/icons/profile_avatar.jpeg';
const UserIcon = ({ onClick = () => {} }) => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div onClick={onClick} className={styles.container}>
      <Image
        src={user?.profile?.avatarUrl || profileImage}
        width={'40'}
        height={'40'}
        alt={user?.profile?.fullName}
      />
    </div>
  );
};

export default UserIcon;
