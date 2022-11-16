import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from '../apiSlice';

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id,
})
const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (pagination) => ({
        url: `/user/pagination/${pagination}`,
      }),
      transformResponse: (response) => {
        return response;
      },
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    getAllUsers: builder.query({
      query: () => '/user/all',
      transformResponse: (res) => {
        return usersAdapter.setAll(initialState, res)
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetAllUsersQuery } = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getAllUsers.select()

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult, selectId) => usersResult.data
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
