import { api } from "./api.js";

export const trainApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStation: build.query({
      query: () => ({
        url: "/api/trains/stations",
        method: "GET",
      }),
      providesTags: ["Station"],
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
    getTrainFrequency: build.query({
      query: () => ({
        url: "/api/trains/admin/train-frequency",
        method: "GET",
      }),
      providesTags: ["Frequency"],
    }),
    createTrainSchedule: build.mutation({
    query: (data) => ({
      url: "/api/trains/admin/create-train-schedule",
      method: "POST",
      body: data,
    })
  }),
  deleteTrainSchedule: build.mutation({
    query: (data) => ({
      url: "/api/trains//admin/delete-train-schedule",
      method: "DELETE",
      params: data
    })
  }),
  getStatBoxData: build.query({
    query: () => ({
      url: "/api/trains/admin/stat-box-data",
      method: "GET"
    })
  }),
  createWagon: build.mutation({
    query: (data) => ({
      url: "/api/trains/admin/create-wagon",
      method: "POST",
      body: data,
    })
  }),
  createFrequency: build.mutation({
    query: (data) => ({
      url: "/api/trains/admin/create-frequency",
      method: "POST",
      body: data,
    })
  }),
  getBookingPriceData: build.query({
    query: () => ({
      url: "/api/booking/admin/bookingprice",
      method: "GET"
    })
  }),
  }),
  
});

export const {
  useGetStationQuery,
  useGetAllScheduleQuery,
  useGetTrainStopQuery,
  useGetWagonTypeQuery,
  useGetTrainFrequencyQuery,
  useCreateTrainScheduleMutation,
  useDeleteTrainScheduleMutation,
  useGetStatBoxDataQuery,
  useCreateWagonMutation,
  useCreateFrequencyMutation,
  useGetBookingPriceDataQuery
} = trainApi;
