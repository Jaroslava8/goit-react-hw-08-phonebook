import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  endpoints: builder => ({
    user: builder.query({
      query: token => ({
        url: '/users/current',
        headers: {
          Authorization: token,
        },
      }),
    }),
    register: builder.mutation({
      query: infoUser => ({
        url: `/users/signup`,
        method: 'POST',
        body: infoUser,
      }),
    }),
    login: builder.mutation({
      query: infoUser => ({
        url: '/users/login',
        method: 'POST',
        body: infoUser,
      }),
    }),
    logout: builder.mutation({
      query: token => ({
        url: '/users/logout',
        method: 'POST',
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUserQuery,
} = API;