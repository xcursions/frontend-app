export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export type ChangeEmailPayload = {
  email: string;
};
export type ChangeEmailOtpPayload = {
  otpId: string;
  otpCode: string;
};
export type ConfirmEmailOtpPayload = {
  otpId: string;
  otpCode: string;
};
export type UpdateUserProfilePayload = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  dateOfBirth?: string;
};