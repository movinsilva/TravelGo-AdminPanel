import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Station",
    "Schedule",
    "TrainStop",
    "WagonTypes",
    "AggregateDayData",
    "AggregateMonthData",
  ],
  endpoints: (build) => ({
   
  }),
});


  


