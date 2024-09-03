import { apiSlice } from "../api/ApiSlice";

const deliverySlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    currentDeliveriesForDriver: build.query({
      query: () => "/driver/deliveries",
    }),
  }),
  overrideExisting: false,
});

export const { useCurrentDeliveriesForDriverQuery } = deliverySlice;
