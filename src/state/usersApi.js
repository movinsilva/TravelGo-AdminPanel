import { api } from './api';

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
      login: build.mutation({
        query: (data) => ({
          url: "/api/admin/authAdmin",
          method: 'POST',
          body: data,
        }),
      }),
      register: build.mutation({
        query:(data) => ({
          url: '/api/admin/registerAdmin',
          method: 'POST',
          body: data,
        })
      }),
      logout: build.mutation({
        query: () => ({
          url: "/api/admin/logoutAdmin",
          method: "POST"
        })
      })
    }),
  });
  
  export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = userApi;