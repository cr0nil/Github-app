import { createAction } from "@reduxjs/toolkit";
import { ResponseUsers, Repo } from "./User.types";

export const usersActionTypes = {
  FETCH_USERS_REQUEST: "user/fetchUsersRequest",
  FETCH_USERS_FAIL: "user/fetchUsersFail",
  FETCH_USERS_SUCCESS: "user/fetchUsersSuccess",
  FETCH_USER_REPOS_REQUEST: "user/fetchUserReposRequest",
  FETCH_USER_REPOS_FAIL: "user/fetchUserReposFail",
  FETCH_USER_REPOS_SUCCESS: "user/fetchUserReposSuccess",
};

export const userActions = {
  fetchUsersRequest: createAction<string>(usersActionTypes.FETCH_USERS_REQUEST),
  fetchUsersSuccess: createAction<ResponseUsers>(
    usersActionTypes.FETCH_USERS_SUCCESS
  ),
  fetchUsersFail: createAction<Error>(usersActionTypes.FETCH_USERS_FAIL),

  fetchUserReposRequest: createAction<string>(
    usersActionTypes.FETCH_USER_REPOS_REQUEST
  ),
  fetchUserReposSuccess: createAction<{
    response: Array<Repo>;
    username: string;
  }>(usersActionTypes.FETCH_USER_REPOS_SUCCESS),
  fetchUserReposFail: createAction<Error>(
    usersActionTypes.FETCH_USER_REPOS_FAIL
  ),
};
