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
    getStation: build.query({
      query: () => ({
        url: "/api/trains/stations",
        method: "GET",
      }),
      provideTags: ["Station"],
    }),
    getAllSchedule: build.query({
      query: () => ({
        url: "/api/trains/admin/schedule",
        method: "GET",
      }),
      providesTags: ["Schedule"],
    }),
    getTrainStop: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "/api/trains/admin/train-stations",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["TrainStop"],
    }),
    getWagonType: build.query({
      query: () => ({
        url: "/api/trains/admin/wagon-types",
        method: "GET",
      }),
      providesTags: ["WagonTypes"],
    }),
    getAggregatedBookingDataByDay: build.query({
      query: () => ({
        url: "/api/trains/admin/aggregated-booking-data-day",
        method: "GET",
      }),
      providesTags: ["AggregateDayData"],
    }),
    getAggregatedBookingDataByMonth: build.query({
      query: () => ({
        url: "/api/trains/admin/aggregated-booking-data-month",
        method: "GET",
      }),
      providesTags: ["AggregateMonthData"],
    }),
  }),
});

export const {
  useGetStationQuery,
  useGetAllScheduleQuery,
  useGetTrainStopQuery,
  useGetWagonTypeQuery,
  useGetAggregatedBookingDataByDayQuery,
  useGetAggregatedBookingDataByMonthQuery,
} = api;
