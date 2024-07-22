import { takeLatest, put, call, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { usersActionTypes, userActions } from "./User.action";
import { fetchUserReposApi, fetchUsersApi } from "./User.api";
import { User, ResponseUsers, Repo } from "./User.types";
import { RootState } from "../reducers";

function* fetchUsersSaga({ payload }: PayloadAction<string>) {
  const [response, error]: [ResponseUsers, Error] = yield call(
    fetchUsersApi,
    payload
  );

  if (error) {
    yield put(userActions.fetchUsersFail(error));
  } else {
    yield put(userActions.fetchUsersSuccess(response));
  }
}
const getUserDataFromState = (state: RootState) => state.user.users;

function* fetchUserReposSaga({ payload }: PayloadAction<string>) {
  const users: Array<User> = yield select(getUserDataFromState);

  const [response, error]: [Array<Repo>, Error] = yield call(
    fetchUserReposApi,
    payload,
    users.find((el) => el.login === payload)?.currentPageRepos ?? 1
  );

  if (error) {
    yield put(userActions.fetchUserReposFail(error));
  } else {
    yield put(
      userActions.fetchUserReposSuccess({ response, username: payload })
    );
  }
}

export default [
  takeLatest(usersActionTypes.FETCH_USERS_REQUEST, fetchUsersSaga),
  takeLatest(usersActionTypes.FETCH_USER_REPOS_REQUEST, fetchUserReposSaga),
];
