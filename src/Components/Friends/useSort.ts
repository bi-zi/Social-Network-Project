import { useAppDispatch, useAppSelector } from '../../store/store';
import { User } from '../../store/user/types';

export function useSort(catergory: string, sortBy: string, id: string) {
  const state = useAppSelector((state) => state);

  let sortedFriends = [] as User[];

  const user =
    state.user?.userOne?.[0] === undefined
      ? state.user.usersAll?.find((user) => user._id === id)
      : state.user?.userOne?.[0];

  if (catergory === 'friends') {
    sortedFriends = state.user.usersAll?.filter((userId) => user?.friends.includes(userId._id));
  }

  if (catergory === 'people') {
    sortedFriends = state.user.usersAll;
  }

  if (catergory === 'subscribers') {
    sortedFriends = state.user.usersAll?.filter((userId) => user?.subscribers.includes(userId._id));
  }


    if (sortBy === 'a-z') {
      sortedFriends = [...sortedFriends]?.sort(function (a, b) {
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
          return 1;
        }
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
          return -1;
        }
        return 0;
      });
    }

    if (sortBy === 'z-a') {
      sortedFriends = [...sortedFriends]
        ?.sort(function (a, b) {
          if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
            return 1;
          }
          if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
            return -1;
          }
          return 0;
        })
        .reverse();
    }

    if (sortBy === 'friends') {
      sortedFriends = [...sortedFriends]?.sort(function (a, b) {
        if (a.friends.length < b.friends.length) {
          return 1;
        }
        if (a.friends.length > b.friends.length) {
          return -1;
        }
        return 0;
      });
    }

    if (sortBy === 'subscribers') {
      sortedFriends = [...sortedFriends]?.sort(function (a, b) {
        if (a.subscribers.length < b.subscribers.length) {
          return 1;
        }
        if (a.subscribers.length > b.subscribers.length) {
          return -1;
        }
        return 0;
      });
    }

  return { sortedFriends };
}
