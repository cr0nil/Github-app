import { NUMBER_OF_USERS } from "@/constants/ApiConst";
import { api } from "../../api";
import { promiseWrapper } from "../../utils/PromiseWrapper";
import { User, PromiseUsersResponse, Repo } from "./User.types";

export const fetchUsersApi = async (
  usernameQuery: string
): PromiseUsersResponse => {
  return promiseWrapper(
    api.get(`/search/users?q=${usernameQuery}&per_page=${NUMBER_OF_USERS}`)
  );
};

export const fetchUserReposApi = async (
  username: string,
  page: number
): Promise<[Array<Repo>, Error]> => {
  return promiseWrapper(
    api.get(`/users/${username}/repos?per_page=10&page=${page}`)
  );
};
