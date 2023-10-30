import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//process.env.REACT_APP_BASE_URL  : give this for baseURL

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://travelgo.ecodeit.com:5000' }),
  reducerPath: "adminApi",
  tagTypes: [
    "Station",
    "Schedule",
    "TrainStop",
    "WagonTypes",
    "AggregateDayData",
    "AggregateMonthData",
    "Frequency"
  ],
  endpoints: (build) => ({
   
  }),
});


  


