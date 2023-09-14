import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useNavigate } from "react-router-dom";

const Wagon = () => {
    const theme = useTheme();
    const { data, isLoading } = {data: [
        {
          wagonID: 1,
          class: 'First Class',
          seats: 55,
          amenities: 'Wi-Fi, AC, Meal Service',
        },
        {
          wagonID: 2,
          class: 'First Class',
          seats: 50,
          amenities: 'Wi-Fi, AC, Meal Service',
        },
        {
          wagonID: 3,
          class: 'First Class',
          seats: 45,
          amenities: 'Wi-Fi, AC, Meal Service',
        },
        {
          wagonID: 4,
          class: 'Business Class',
          seats: 58,
          amenities: 'Wi-Fi, AC, Snack Bar',
        },
        {
          wagonID: 5,
          class: 'Business Class',
          seats: 52,
          amenities: 'Wi-Fi, AC, Snack Bar',
        },
        {
          wagonID: 6,
          class: 'Business Class',
          seats: 47,
          amenities: 'Wi-Fi, AC, Snack Bar',
        },
        {
          wagonID: 7,
          class: 'Economy Class',
          seats: 60,
          amenities: 'AC',
        },
        {
          wagonID: 8,
          class: 'Economy Class',
          seats: 55,
          amenities: 'AC',
        },
        {
          wagonID: 9,
          class: 'Economy Class',
          seats: 52,
          amenities: 'AC',
        },
        {
          wagonID: 10,
          class: 'Standard Class',
          seats: 48,
          amenities: 'AC',
        },
        {
          wagonID: 11,
          class: 'Standard Class',
          seats: 43,
          amenities: 'AC',
        },
        {
          wagonID: 12,
          class: 'Standard Class',
          seats: 41,
          amenities: 'AC',
        },
        {
          wagonID: 13,
          class: 'Economy Class',
          seats: 59,
          amenities: 'AC, Snack Bar',
        },
        {
          wagonID: 14,
          class: 'Economy Class',
          seats: 53,
          amenities: 'AC, Snack Bar',
        },
        {
          wagonID: 15,
          class: 'Economy Class',
          seats: 50,
          amenities: 'AC, Snack Bar',
        },
      ], isLoading: false}
    console.log("data", data);
  
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
  
    const navigate = useNavigate();
  
    const buttonFunction = () => {
      navigate('/addschedule')
    }
  
    const columns = [
      {
        field: "wagonID",
        headerName: "Wagon ID",
        flex: 0.4,
      },
      {
        field: "class",
        headerName: "Wagon class",
        flex: 1,
      },
      {
        field: "seats",
        headerName: "No. of seats",
        flex: 1,
      },
      {
        field: "amenities",
        headerName: "Amenities for the wagon",
        flex: 1,
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
          getRowId={(row) => row.wagonID}
          rows={data || []}
          columns={columns}
          slots={{ toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  )
}

export default Wagon