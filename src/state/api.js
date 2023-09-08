import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["Station", "Schedule", "TrainStop"],
    endpoints: (build) => ({
        getStation: build.query({
            query: () => ({
                url: "/api/trains/stations",
                method: "GET"
            }),
            provideTags: ["Station"]
        }),
        getAllSchedule: build.query({
            query: () => ({
                url: "/api/trains/admin/schedule",
                method: "GET"
            }),
            providesTags: ["Schedule"]
        }),
        getTrainStop: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "/api/trains/admin/train-stations",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["TrainStop"]
        })
    })
})

export const { useGetStationQuery, useGetAllScheduleQuery, useGetTrainStopQuery } = api;