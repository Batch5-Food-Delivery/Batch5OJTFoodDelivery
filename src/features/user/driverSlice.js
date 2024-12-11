import { apiSlice } from "../api/ApiSlice";

export const driverSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    applyDriver: build.mutation({
      query: () => ({
        url: "/user/applyDriver",
        method: "PUT",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useApplyDriverMutation } = driverSlice;
