import { useDispatch, useSelector } from "react-redux";
import {
  pendingUsersSelector,
  usersSelector,
} from "@/redux/user/User.selector";
import { useDebouncedCallback } from "use-debounce";
import { userActions } from "@/redux/user";
import { useCallback, useState } from "react";

export function useUsers() {
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const pending = useSelector(pendingUsersSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(-1);
  const [currentUsername, setCurrentUsername] = useState("");

  const debounced = useDebouncedCallback(
    (value) => {
      setIsLoading(true);
      searchUsers(value);
    },
    // delay in ms
    1000
  );
  const searchUsers = async (query: string) => {
    dispatch(userActions.fetchUsersRequest(query));
    setIsLoading(false);
    setExpandedId(-1);
  };

  const setExpandedIdHandler = useCallback(
    (id: number, name: string) => {
      setExpandedId((prev) => {
        if (prev === id) {
          return -1;
        }
        setCurrentUsername(name);
        users.find((el) => el.login === name)?.repos?.length === 0 &&
          dispatch(userActions.fetchUserReposRequest(name));
        return id;
      });
    },
    [expandedId, users]
  );

  const loadMoreReposHandler = () => {
    dispatch(userActions.fetchUserReposRequest(currentUsername));
  };

  return {
    pending: pending || isLoading,
    debounced,
    expandedId,
    users,
    setExpandedIdHandler,
    loadMoreReposHandler,
    setIsLoading,
  };
}
