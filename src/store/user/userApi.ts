import {} from './types';
import { apiSlice } from '../apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMainUser: builder.query({
      query: (login) => ({
        url: `/api/MainUser/${login}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetMainUserQuery} = userApiSlice;
