// eslint-disable-next-line simple-import-sort/imports
import type { RootState } from "@/store";
import { createSelector } from "reselect";

export const selectUser = (state: RootState) => state.user.user;

export const selectUserId = createSelector(selectUser, (user) => user?._id);
