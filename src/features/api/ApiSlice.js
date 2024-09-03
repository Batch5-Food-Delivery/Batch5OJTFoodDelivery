import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config/baseURL";
import { token } from "../auth/getToken";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers) => {
      const jwtToken = token;
      headers.set("Authorization", `${jwtToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["DriverDeliveries"],
});
