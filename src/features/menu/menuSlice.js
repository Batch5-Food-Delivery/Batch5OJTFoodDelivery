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
      query: (food) => ({
        url: `/food/create`,
        method: "POST",
        body: food.data,
      }),
      invalidatesTags: (
        result,
        error,
        { restaurant: { id: restaurantId } }
      ) => [{ type: "RestaurantMenus", id: restaurantId }],
    }),
    uploadFoodImage: build.mutation({
      query: ({ image, foodId }) => {
        const formData = new FormData();
        formData.append("file", image); // The field name "file" matches your backend

        return {
          url: `/food/uploadImage/${foodId}`, // Dynamically insert foodId
          method: "POST",
          body: formData, // Let the browser handle the multipart form-data content type
          // No need for the headers or formData: true
        };
      },
    }),
    overrideExisting: false,
  }),
});

export const {
  useRestaurantMenusQuery,
  useCreateMenuMutation,
  useCreateFoodMutation,
  useUploadFoodImageMutation,
} = menuSlice;
