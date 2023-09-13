import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import {
  useGetAggregatedBookingDataByMonthQuery,
} from "state/statApi";

const Monthly = () => {
  const theme = useTheme();

  const { data: dataMonth, isLoading } =
    
    useGetAggregatedBookingDataByMonthQuery();
  var sortedDataPerMonth = null;
  var data = null;
console.log("🚀 ~ file: index.jsx:14 ~ Monthly ~ dataMonth:", dataMonth)


  if (dataMonth !== undefined && dataMonth[0].monthly_data.length > 0) {
    
    // Assuming dataPerMonth is your array of month data
    sortedDataPerMonth = [...dataMonth[0].monthly_data].sort((a, b) => {
      // Define a mapping of month names to their corresponding numeric values
      const monthOrder = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12,
      };

      // Convert the month names to their numeric values for comparison
      const monthA = monthOrder[a.month.trim()];
      const monthB = monthOrder[b.month.trim()];

      // Compare the numeric values to determine the sorting order
      return monthA - monthB;
    });
    
  }

  if (dataMonth !== undefined) {
    data = {
      totalAmountPerYear: dataMonth[0].yearly_booking_amount_total,
      totalUsersPerYear: dataMonth[0].yearly_total_customers,
      dataPerMonth: sortedDataPerMonth,
    };
  }

  const [formattedData] = useMemo(() => {
    if (!data || !data.dataPerMonth) return [];

    const { dataPerMonth } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };

    Object.values(dataPerMonth).forEach(
      ({ month, total_booking_amount, total_customers }) => {
        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: total_booking_amount },
        ];
      }
    );

    const formattedData = [totalSalesLine];
    return [formattedData];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of monthly sales from bookings" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            // curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Monthly;
