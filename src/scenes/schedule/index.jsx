import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useGetAllScheduleQuery } from "state/trainApi";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAllScheduleQuery();
  console.log("data", data);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const buttonFunction = () => {
    navigate('/addschedule')
  }

  const columns = [
    {
      field: "TrainNo",
      headerName: "Train No",
      flex: 0.4,
    },
    {
      field: "TrainName",
      headerName: "Train Name",
      flex: 1,
    },
    {
      field: "Source",
      headerName: "Source",
      flex: 0.4,
    },
    {
      field: "Destination",
      headerName: "Destination",
      flex: 0.4,
    },
    {
      field: "ArrivalTime",
      headerName: "Arrival Time",
      flex: 0.5,
    },
    {
      field: "DepartureTime",
      headerName: "Departure Time",
      flex: 0.5,
    },
    {
      field: "TrainType",
      headerName: "Train Type",
      flex: 0.5,
    },
    {
      field: "Frequency",
      headerName: "Frequency",
      flex: 0.5,
    },
    {
      field: "DefaultTotalSeats",
      headerName: "Default Total Seats",
      flex: 0.7,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Train Schedule" subtitle="List of Train Schedule" buttonFunc={buttonFunction} />
      
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-virtualScrollerContent": {
            width: "200px !important"
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.TrainNo}
          rows={data || []}
          columns={columns}
          slots={{ toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Schedule;