import { apiSlice } from "../api/ApiSlice";

export const driverSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    applyDriver: build.mutation({
      query: () => ({
        url: "/user/applyDriver",
        method: "PUT",
      }),
    }),
    switchAvailable: build.mutation({
      query: (available) => ({
        url: `/user/availableStatus?available=${available}`,
        method: "PUT",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useApplyDriverMutation, useSwitchAvailableMutation } =
  driverSlice;
