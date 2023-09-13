import {api} from './api.js'


export const trainApi = api.injectEndpoints({
    endpoints: (build) => ({
        getStation: build.query({
            query: () => ({
                url: "/api/trains/stations",
                method: "GET",
            }),
            providesTags: ["Station"]
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
    })
})

export const { useGetStationQuery,
    useGetAllScheduleQuery,
    useGetTrainStopQuery,
    useGetWagonTypeQuery, } = trainApi;