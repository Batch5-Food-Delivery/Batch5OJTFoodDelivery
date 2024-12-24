import { apiSlice } from "../api/ApiSlice";

export const restaurantDetailsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    restaurantDetails: build.query({
      query: (restaurantId) => `/restaurant/${restaurantId}`,
      providesTags: ["RestaurantDetails"],
    }),
    isRestaurantOwner: build.query({
      query: (restaurantId) => `/restaurant/${restaurantId}/isOwner`,
      providesTags: ["RestaurantDetails"],
    }),
    createRestaurant: build.mutation({
      query: (reqBody) => {
        const { restaurant, image } = reqBody;

        const formData = new FormData();
        formData.append("restaurant", JSON.stringify(restaurant));
        formData.append("image", image);

        return {
          url: `/restaurant/create`,
          method: "POST",
          body: formData,
        };
      },
    }),
    uploadRestaurantImage: build.mutation({
      query: ({ image, restaurantId }) => {
        const formData = new FormData();
        formData.append("file", image);

        return {
          url: `/restaurant/uploadImage/${restaurantId}`,
          method: "POST",
          body: formData,
        };
      },
    }),
  }),

  overrideExisting: false,
});

export const {
  useRestaurantDetailsQuery,
  useIsRestaurantOwnerQuery,
  useCreateRestaurantMutation,
  useUploadRestaurantImageMutation,
} = restaurantDetailsSlice;
