import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useGetStationQuery } from "state/trainApi";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useNavigate } from "react-router-dom";

const Station = () => {
    const theme = useTheme();
  const { data, isLoading } = useGetStationQuery();
  console.log("data", data);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const buttonFunction = () => {
    navigate('/addschedule')
  }

  const columns = [
    {
      field: "StationID",
      headerName: "Station ID",
      flex: 0.4,
    },
    {
      field: "StationName",
      headerName: "Station Name",
      flex: 1,
    },
    
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Train Stations" subtitle="List of Train Stations"  />
      
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
          getRowId={(row) => row.StationID}
          rows={data || []}
          columns={columns}
          slots={{ toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  )
}

export default Station