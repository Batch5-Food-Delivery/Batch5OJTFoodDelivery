import { apiSlice } from "../api/ApiSlice";

export const restaurantDetailsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    restaurantDetails: build.query({
      query: (restaurantId) => `/restaurant/${restaurantId}`,
      providesTags: ["RestaurantDetails"],
    }),
  }),
  overrideExisting: false,
});

export const { useRestaurantDetailsQuery } = restaurantDetailsSlice;
