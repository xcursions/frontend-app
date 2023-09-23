export type LoginPayload = {
  identity: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export type VerifyOTPPayload = {
  userId: string;
  otpId: string;
  otpCode: string;
};
export type ResendOTPPayload = {
  userId: string;
  otpId: string;
};
export type ForgotPasswordPayload = {
  email: string;
};

export type VerifyForgotPasswordOTPPayload = {
  email: string;
  otpCode: string;
};
export type ForgotPasswordOTPPayload = {
  userId: string;
  otpId: string;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
};
export type GoogleLoginPayload = {
  idToken: any;
};
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
