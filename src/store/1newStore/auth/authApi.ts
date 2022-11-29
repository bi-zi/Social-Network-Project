import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { Registration } from './types';
import { apiSlice } from '../../apiSlice';

const usersAdapter = createEntityAdapter({
  selectId: (user: any) => user._id,
});

const initialState = usersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postRegistration: builder.mutation({
      query: (body) => ({
        url: '/api/registration',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {usePostRegistrationMutation} = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getAllUsers.select();

// const selectUsersData = createSelector(selectUsersResult, (usersResult, selectId) => usersResult.data);

// export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
// (state) => selectUsersData(state) ?? initialState,
// );
