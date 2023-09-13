import {api} from './api.js'


export const statApi = api.injectEndpoints({
    endpoints: (build) => ({
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
    })
})

export const {   useGetAggregatedBookingDataByDayQuery,
    useGetAggregatedBookingDataByMonthQuery, } = statApi;