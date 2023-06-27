/* eslint-disable import/extensions */
import HeaderSection from '@/ui-components/HeaderSection';
import { useAppSelector } from '@/hooks';

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <>
      <HeaderSection
        heading={`${user?.profile?.fullName}`}
        subHeading={'Welcome back to your dashboard'}
      />
    </>
  );
};

export default Profile;
