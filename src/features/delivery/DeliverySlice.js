import { apiSlice } from "../api/ApiSlice";

export const deliverySlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    currentDeliveriesForDriver: build.query({
      query: () => "/driver/deliveries",
      providesTags: ["DriverDeliveries"],
    }),
    completeDelivery: build.mutation({
      query: (deliveryId) => ({
        url: `driver/deliveries/complete/${deliveryId}`,
        method: "PATCH",
      }),
      onQueryStarted(deliveryId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          deliverySlice.util.updateQueryData(
            "currentDeliveriesForDriver",
            undefined,
            (draft) => {
              const delivery = draft.find(
                (delivery) => delivery.id === deliveryId
              );
              delivery.completed = true;
            }
          )
        );
        queryFulfilled.catch(
          dispatch(deliverySlice.util.invalidateTags(["DriverDeliveries"]))
        );
      },
    }),
    completedDeliveriesForDriver: build.query({
      query: () => "/driver/deliveries/history",
      providesTags: ["DriverDeliveries"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCurrentDeliveriesForDriverQuery,
  useCompleteDeliveryMutation,
  useCompletedDeliveriesForDriverQuery,
} = deliverySlice;
