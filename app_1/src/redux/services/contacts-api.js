import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API = createApi({
  reducerPath: 'contactsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: token => ({
        url: '/contacts',
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: info => ({
        url: `/contacts/${info.id}`,
        method: 'DELETE',
        headers: {
          Authorization: info.token,
        },
      }),
      invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: info => {
        return {
          url: '/contacts',
          method: 'POST',
          body: info.contact,
          headers: {
            Authorization: info.token,
          },
        };
      },
      invalidatesTags: ['Contacts'],
    }),
    updateContact: builder.mutation({
      query: info => {
        return {
          url: `/contacts/${info.id}`,
          method: 'PATCH',
          body: info.contact,
          headers: {
            Authorization: info.token,
          },
        };
      },
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
  useUpdateContactMutation,
} = API;