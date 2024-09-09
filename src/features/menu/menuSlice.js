import { apiSlice } from "../api/ApiSlice";

export const menuSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    restaurantMenus: build.query({
      query: (restaurantId) => `/menu/${restaurantId}`,
      providesTags: (result, error, restaurantId) => [
        { type: "RestaurantMenus", id: restaurantId },
      ],
    }),
    createMenu: build.mutation({
      query: (newMenu) => ({
        url: `/menu/create`,
        method: "POST",
        body: newMenu,
      }),
      invalidatesTags: (
        result,
        error,
        { restaurant: { id: restaurantId } }
      ) => [{ type: "RestaurantMenus", id: restaurantId }],
    }),
  }),
  overrideExisting: false,
});

export const { useRestaurantMenusQuery, useCreateMenuMutation } = menuSlice;
