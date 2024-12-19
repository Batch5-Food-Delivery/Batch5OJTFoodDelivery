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
    updateMenu: build.mutation({
      query: (updatedMenu) => ({
        url: `/menu/update`,
        method: "PUT",
        body: updatedMenu,
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
    editFood: build.mutation({
      query: (reqBody) => {
        const { food, image } = reqBody;

        const formData = new FormData();
        formData.append("food", JSON.stringify(food));
        formData.append("image", image);

        return {
          url: `/food/update`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (
        result,
        error,
        { restaurant: { id: restaurantId } }
      ) => [{ type: "RestaurantMenus", id: restaurantId }],
    }),
    deleteFood: build.mutation({
      query: (food) => ({
        url: `food/${food.id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: (food) => [
        { type: "RestaurantMenus", id: food.restaurant.id },
      ],
    }),
    overrideExisting: false,
  }),
});

export const {
  useRestaurantMenusQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useCreateFoodMutation,
  useEditFoodMutation,
  useDeleteFoodMutation,
} = menuSlice;
