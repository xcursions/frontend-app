export type LoginPayload = {
  email: string;
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

export type ForgotPasswordOTPPayload = {
  userId: string;
  otpId: string;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
};
export type GoogleLoginPayload = {
  idToken: string;
};
