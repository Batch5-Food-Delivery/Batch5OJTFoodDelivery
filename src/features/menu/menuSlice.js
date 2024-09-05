import { apiSlice } from "../api/ApiSlice";

export const menuSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    restaurantMenus: build.query({
      query: (restaurantId) => `/menu/${restaurantId}`,
      providesTags: (result, error, restaurantId) => [
        { type: "RestaurantMenus", id: restaurantId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useRestaurantMenusQuery } = menuSlice;
