type IUser = {
  id: string;
  userId?: string;
  otpId?: string;
  otpCode?: string;
  emailVerified: boolean;
  suspended: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  profile: UserProfile;
  email: string;
};
export default IUser;

type UserProfile = {
  id: string;
  userId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  middleName: string;
  avatarUrl: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  state: string;
  city: string;
  country: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};
