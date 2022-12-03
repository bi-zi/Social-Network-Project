import {} from './types';
import { apiSlice } from '../apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMainUser: builder.query({
      query: (login) => ({
        url: `/api/mainUser/${login}`,
        method: 'GET',
        credentials: 'include',
        
      }),
    }),
  }),
});

export const { useGetMainUserQuery } = userApiSlice;
