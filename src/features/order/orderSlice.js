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
    getCustomerOrders: build.query({
      query: () => `/order/customer/all`,
      providesTags: ["UserOrders", "User"],
    }),
    getAvailableDrivers: build.query({
      query: () => `/user/availableDrivers`,
      keepUnusedDataFor: 10,
    }),
    completeOrder: build.mutation({
      query: (order) => ({
        url: "/order/completeOrder",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["RestaurantOrders"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetRestaurantOrdersQuery,
  useGetRestaurantOrderHistoryQuery,
  useGetCustomerOrdersQuery,
  useGetAvailableDriversQuery,
  useCompleteOrderMutation,
} = orderSlice;
