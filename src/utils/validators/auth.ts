import { isEmail, isEmpty, isValid } from "./helpers";

export const validateLoginInputs = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const errors = {
    email: "",
    password: "",
  };

  if (isEmpty(email)) errors.email = "Email cannot be empty";
  else if (!isEmail(email)) errors.email = "Invalid email address";

  if (isEmpty(password)) errors.password = "Password cannot be empty";

  return {
    valid: isValid(errors),
    errors,
  };
};

export const validateClaimAccountInput = ({ email }: { email: string }) => {
  const errors = {
    email: "",
  };

  if (isEmpty(email)) errors.email = "Email cannot be empty";
  else if (!isEmail(email)) errors.email = "Invalid email address";

  return {
    valid: isValid(errors),
    errors,
  };
};

export const validateRegisterInputs = ({
  fullName,
  username,
  email,
  password,
}: {
  fullName: string;
  username: string;
  email: string;
  password: string;
}) => {
  const errors = {
    fullName: "",
    username: "",
    email: "",
    password: "",
  };

  if (isEmpty(fullName)) errors.fullName = "Name cannot be empty";
  if (isEmpty(username)) errors.username = "Username cannot be empty";

  if (isEmpty(email)) errors.email = "Email cannot be empty";
  else if (!isEmail(email)) errors.email = "Invalid email address";

  if (isEmpty(password)) errors.password = "Password cannot be empty";

  return {
    valid: isValid(errors),
    errors,
  };
};

export const validateOTPInputs = ({ otpCode }: { otpCode: string }) => {
  const errors = {
    otpCode: "",
    userId: "",
    otpId: "",
  };

  if (isEmpty(otpCode)) errors.otpCode = "OTP cannot be empty";
  if (otpCode.length !== 6) errors.otpCode = "OTP must be only 4 characters";

  return {
    valid: isValid(errors),
    errors,
  };
};
