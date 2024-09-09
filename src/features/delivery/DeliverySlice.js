import { apiSlice } from "../api/ApiSlice";

export const deliverySlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    currentDeliveriesForDriver: build.query({
      query: () => "/driver/myDeliveries",
      providesTags: ["DriverDeliveries"],
    }),
    completeDelivery: build.mutation({
      query: (deliveryId) => ({
        url: `driver/deliveries/complete/${deliveryId}`,
        method: "PATCH",
      }),
    }),
    completedDeliveriesForDriver: build.query({
      query: () => "/driver/myDeliveries/history",
      providesTags: ["DriverDeliveries"],
    }),
    currentDeliveriesForUser: build.query({
      query: () => "user/deliveries",
    }),
    completedDeliveriesForUser: build.query({
      query: () => "user/deliveries/history",
    }),
    currentDeliveriesForRestaurant: build.query({
      query: (restaurantId) => `myRestaurant/${restaurantId}/deliveries`,
    }),
    completedDeliveriesForRestaurant: build.query({
      query: (restaurantId) =>
        `myRestaurant/${restaurantId}/deliveries/history`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useCurrentDeliveriesForDriverQuery,
  useCompleteDeliveryMutation,
  useCompletedDeliveriesForDriverQuery,
  useCurrentDeliveriesForUserQuery,
  useCompletedDeliveriesForUserQuery,
  useCurrentDeliveriesForRestaurantQuery,
  useCompletedDeliveriesForRestaurantQuery,
} = deliverySlice;

/*
const {data, isFetching, isSuccess, isError, error} = useCurrentDeliveriesForUserQuery()
const {data, isFetching, isSuccess, isError, error} = useCompletedDeliveriesForUserQuery()
const {data, isFetching, isSuccess, isError, error} = useCurrentDeliveriesForRestaurantQuery()
const {data, isFetching, isSuccess, isError, error} = useCompletedDeliveriesForRestaurantQuery()

*/
