import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { setMainUser } from './slice';
import { apiSlice } from '../../apiSlice';

const usersAdapter = createEntityAdapter({
  selectId: (user: any) => user._id,
});

const initialState = usersAdapter.getInitialState();

export interface PostRegistration {
  login: string;
  firstName: string;
  lastName: string;
  gender: string;
  birdayDate: Date;
  email: string;
  password: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postRegistration: builder.mutation<PostRegistration, Partial<PostRegistration>>({
      query: (body) => ({
        url: '/api/registration',
        method: 'POST',
        body,
        onSuccess: async (dispatch:any, data:any) => {
          const response = data as any;
          dispatch(setMainUser(response.data));
        },
      }),
    }),
  }),
});

export const { usePostRegistrationMutation } = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getAllUsers.select();

// const selectUsersData = createSelector(selectUsersResult, (usersResult, selectId) => usersResult.data);

// export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
// (state) => selectUsersData(state) ?? initialState,
// );
