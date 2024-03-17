// eslint-disable-next-line simple-import-sort/imports
import type { RootState } from "@/store";
import { createSelector } from "reselect";

export const selectUser = (state: RootState) => state.user.user;

export const selectedUser = createSelector(selectUser, (user) => user);
export const selectUserOtpId = createSelector(
  selectUser,
  (user) => user?.otpId
);
export const selectUserEmail = createSelector(
  selectUser,
  (user) => user?.email
);
export const selectUserOtpCode = createSelector(
  selectUser,
  (user) => user?.otpCode
);
export const selectedUserId = createSelector(
  selectUser,
  (user) => user?.userId || user?.id
);
export const selectIsUserActivated = createSelector(
  selectUser,
  (userInfo) => userInfo?.emailVerified
);
