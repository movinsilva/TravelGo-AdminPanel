import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    
    reducerPath: "adminApi",
    tagTypes: ["Station"],
    endpoints: (build) => ({
        getStation: build.query({
            query: () => ({
                url: "/api/trains/stations",
                method: "GET"
            }),
            provideTags: ["Station"]
        })
    })
})

export const { useGetStationQuery } = api;