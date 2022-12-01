import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { setAuthorizedUser } from './slice';
import { apiSlice } from '../../apiSlice';

const usersAdapter = createEntityAdapter({
  selectId: (user: any) => user._id,
});

const initialState = usersAdapter.getInitialState();

export interface PostLogin {
  email: string;
  password: string;
  user: {
    login: string;
    email: string;
    isActivated: boolean;
    _id: string;
  };
}

export interface PostRegistration {
  login: string;
  firstName: string;
  lastName: string;
  gender: string;
  birdayDate: Date;
  email: string;
  password: string;
  user: {
    login: string;
    email: string;
    isActivated: boolean;
    _id: string;
  };
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRefresh: builder.query({
      query: () => ({
        url: '/api/refresh',
      }),
    }),
    postLogin: builder.mutation<PostLogin, Partial<PostLogin>>({
      query: (body) => ({
        url: '/api/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    postRegistration: builder.mutation<PostRegistration, Partial<PostRegistration>>({
      query: (body) => ({
        url: '/api/registration',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    postLogout: builder.mutation({
      query: () => ({
        url: '/api/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetRefreshQuery,usePostLoginMutation, usePostRegistrationMutation, usePostLogoutMutation } =
  extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getAllUsers.select();

// const selectUsersData = createSelector(selectUsersResult, (usersResult, selectId) => usersResult.data);

// export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
// (state) => selectUsersData(state) ?? initialState,
// );
