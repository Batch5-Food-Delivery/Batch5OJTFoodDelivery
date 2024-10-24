import { apiSlice } from "../api/ApiSlice";

export const orderSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (order) => ({
        url: "/order/create",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["UserOrders"],
    }),
    getRestaurantOrders: build.query({
      query: (restaurantId) => `/order/restaurant/${restaurantId}/current`,
      providesTags: (result, error, restaurantId) => [
        { type: "RestaurantOrders", id: restaurantId },
      ],
    }),
    getRestaurantOrderHistory: build.query({
      query: (restaurantId) => `/order/restaurant/${restaurantId}/history`,
      providesTags: (result, error, restaurantId) => [
        { type: "RestaurantOrders", id: restaurantId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetRestaurantOrdersQuery,
  useGetRestaurantOrderHistoryQuery,
} = orderSlice;
