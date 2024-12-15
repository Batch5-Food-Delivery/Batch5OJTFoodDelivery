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
    createFood: build.mutation({
      query: (reqBody) => {
        const { food, image } = reqBody;

        const formData = new FormData();
        formData.append("food", JSON.stringify(food));
        formData.append("image", image);

        return {
          url: `/food/create`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (
        result,
        error,
        { restaurant: { id: restaurantId } }
      ) => [{ type: "RestaurantMenus", id: restaurantId }],
    }),
    overrideExisting: false,
  }),
});

export const {
  useRestaurantMenusQuery,
  useCreateMenuMutation,
  useCreateFoodMutation,
} = menuSlice;
