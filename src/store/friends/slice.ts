import { createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { FriendsPageUser, UserSliceState, Status } from './types';
import { apiSlice } from '../apiSlice';

const usersAdapter = createEntityAdapter();

const initialState2 = usersAdapter.getInitialState();

const initialState: UserSliceState = {
  users: [0, 0, [] as FriendsPageUser[]],
  sortedUsers: [],
  categorySort: 'people',
  sortBy: '',
  status: Status.LOADING,
};

const friendsPageSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSortedUsers: (state, action) => {
      state.sortedUsers = action.payload;
    },
    setCatergorySort: (state, action) => {
      state.categorySort = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setClearUsers: (state) => {
      state.users = [0, 0, []];
    },
    setStatus: (state) => {
      state.status = Status.LOADING;
    },

  },
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (pagination: number) => ({
        url: `/user/pagination/${pagination}`,
      }),
      transformResponse: (response: [number, number, FriendsPageUser[]]) => {

        return response;
      },
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
});


// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

// Creates memoized selector
// const selectUsersData = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult.data, // normalized state object with ids & entities
// );

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
//   // Pass in a selector that returns the posts slice of state
// } = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);


export const { useGetUsersQuery } = extendedApiSlice;

export const { setCatergorySort, setClearUsers, setSortedUsers, setSortBy } = friendsPageSlice.actions;
export const friendsPageReducer = friendsPageSlice.reducer;
