import { useAppSelector } from "@/hooks";

const profileImage = "/assets/images/icons/profile_avatar.png";
const ProfileCard = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-2 space-y-4 rounded-md bg-white px-6 py-2 shadow-md sm:flex-row sm:space-x-3">
      <div className=" flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
        <img
          src={user?.profile?.avatarUrl ?? profileImage}
          alt="profile_card_img"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex  flex-col flex-wrap space-y-1">
        {user && (
          <>
            <div className="font-dmSansBold">{user?.profile?.username}</div>
            <div className="font-dmSansRegular">
              <p className="text-[16px]">Welcome back to your dashboard</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
