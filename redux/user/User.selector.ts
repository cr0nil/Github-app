import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

const selectSelf = (state: RootState) => state;
export const usersSelector = createSelector(
  selectSelf,
  (state) => state.user.users
);
export const pendingUsersSelector = createSelector(
  selectSelf,
  (state) => state.user.pendingUsers
);
export const pendingReposSelector = createSelector(
  selectSelf,
  (state) => state.user.pendingRepos
);
