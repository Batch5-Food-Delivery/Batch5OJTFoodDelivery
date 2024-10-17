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
  }),
  overrideExisting: false,
});

export const { useCreateOrderMutation } = orderSlice;
