import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useGetBookingPriceDataQuery } from "state/trainApi";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useNavigate } from "react-router-dom";
import CustomModal from "components/CustomModal";
import { toast } from "react-toastify";



const BookingPrice = () => {

    const theme = useTheme();
    const { data, isLoading, refetch } = useGetBookingPriceDataQuery();
    console.log("data", data);


    const columns = [
        {
          field: "SourceStationName",
          headerName: "Source Station",
          flex: 1,
        },
        {
          field: "DestinationStationName",
          headerName: "Destination Station",
          flex: 1,
        },
        {
          field: "FirstClass",
          headerName: "First Class (LKR)",
          flex: 0.4,
        },
        {
          field: "SecondClass",
          headerName: "Second Class (LKR)",
          flex: 0.4,
        },
        {
          field: "ThirdClass",
          headerName: "Third Class (LKR)",
          flex: 0.5,
        },
        
        // {
        //   field: "actions",
        //   headerName: "Actions",
        //   flex: 0.7,
        //   renderCell: (params) => (
        //     <div>
              
        //       <Button
        //         variant="outlined"
        //         color="error"
        //         onClick={() => {
        //           setSelectedRow(params.row.TrainNo);
        //           handleClickOpen();
        //         }}
                
        //       >
        //         Delete
        //       </Button>
        //     </div>
        //   ),
        // },
      ];

      return (
        <Box m="1.5rem 2.5rem">
          <Header title="Train Schedule" subtitle="List of Train Schedule"  />
          
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
              getRowId={(row) => row.ID}
              rows={data || []}
              columns={columns}
              slots={{ toolbar: DataGridCustomToolbar }}
            />
          </Box>
    
          
        </Box>
      );
}

export default BookingPrice