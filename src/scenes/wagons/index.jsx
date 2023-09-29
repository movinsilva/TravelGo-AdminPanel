import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useNavigate } from "react-router-dom";
import { useGetWagonTypeQuery } from "state/trainApi";

const Wagon = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetWagonTypeQuery();
    console.log("data", data);
  
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
  
    const navigate = useNavigate();
  
    const buttonFunction = () => {
      navigate('/addwagon')
    }
  
    const columns = [
      {
        field: "WagonID",
        headerName: "Wagon ID",
        flex: 0.3,
      },
      {
        field: "Class",
        headerName: "Wagon class",
        flex: 0.6,
      },
      {
        field: "Description",
        headerName: "Description",
        flex: 1,
      },
      {
        field: "Capacity",
        headerName: "No. of seats",
        flex: 0.4,
      },
      {
        field: "Amenities",
        headerName: "Amenities for the wagon",
        flex: 1.5,
      },
      {
        field: "HasTables",
        headerName: "Tables Availability",
        flex: 0.6
      }
      
    ];

  return (
   <Box m="1.5rem 2.5rem">
      <Header title="Wagons" subtitle="List of Wagons" buttonFunc={buttonFunction} />
      
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
          getRowId={(row) => row.WagonID}
          rows={data || []}
          columns={columns}
          slots={{ toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  )
}

export default Wagon