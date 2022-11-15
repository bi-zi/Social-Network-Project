import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_DATA_BASE_LINK }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({}),
});
