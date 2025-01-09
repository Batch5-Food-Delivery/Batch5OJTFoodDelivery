import { apiSlice } from "../api/ApiSlice";

export const addressSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserAddresses: build.query({
      query: () => "/myAddresses",
      providesTags: ["UserAddresses"],
    }),
    createAddress: build.mutation({
      query: (address) => ({
        url: "/newAddress",
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["UserAddresses"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserAddressesQuery, useCreateAddressMutation } =
  addressSlice;
