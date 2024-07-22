import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Repo, ResponseUsers, User } from "./User.types";

interface UserState {
  pendingUsers: boolean;
  pendingRepos: boolean;
  users: User[];
}

export const initialStateUser: UserState = {
  pendingUsers: false,
  pendingRepos: false,
  users: [],
};
const reducer = {
  //users
  fetchUsersRequest: (state: UserState) => {
    state.pendingUsers = true;
  },
  fetchUsersSuccess: (
    state: UserState,
    { payload }: PayloadAction<ResponseUsers>
  ) => {
    state.pendingUsers = false;
    state.users = payload.items.map((el: User) => {
      return { ...el, repos: [], currentPageRepos: 1 };
    });
  },
  fetchUsersFail: (state: UserState) => {
    state.pendingUsers = false;
    state.users = [];
  },
  // user repos
  fetchUserReposRequest: (state: UserState) => {
    state.pendingRepos = true;
  },
  fetchUserReposSuccess: (
    state: UserState,
    { payload }: PayloadAction<{ username: string; response: Array<Repo> }>
  ) => {
    state.pendingRepos = false;
    state.users = state.users.map((el) => {
      return payload.username === el.login
        ? {
            ...el,
            repos: [...el.repos!, ...payload.response],
            currentPageRepos:
              Math.ceil([...el.repos!, ...payload.response].length / 10) + 1,
          }
        : el;
    });
  },
  fetchUserReposFail: (state: UserState) => {
    state.pendingRepos = false;
    state.users = [];
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: reducer,
});

export default userSlice.reducer;
