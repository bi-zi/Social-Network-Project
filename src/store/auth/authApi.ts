import { createEntityAdapter } from '@reduxjs/toolkit';

import { Login, Registration } from './types';
import { apiSlice } from '../apiSlice';

const usersAdapter = createEntityAdapter({
  selectId: (user: any) => user._id,
});

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRefresh: builder.query({
      query: () => ({
        url: '/api/refresh',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    postLogin: builder.mutation<Login, Partial<Login>>({
      query: (body) => ({
        url: '/api/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    postRegistration: builder.mutation<Registration, Partial<Registration>>({
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

export const { useGetRefreshQuery, usePostLoginMutation, usePostRegistrationMutation, usePostLogoutMutation } =
  authApiSlice;
