import React, { useState } from "react";
import { Box, Hidden, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTrainStopQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const TrainStops = () => {
  const theme = useTheme();

  //values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTrainStopQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("🚀 ~ file: index.jsx:24 ~ TrainStops ~ data:", data)

  const columns = [
    {
      field: "stopID",
      headerName: "ID",
      flex: 0.3,
    },
    {
      field: "TrainNo",
      headerName: "Train No",
      flex: 1,
    },
    {
      field: "StationID",
      headerName: "Station ID",
      flex: 1,
    },
    {
      field: "ArrivalTime",
      headerName: "Arrival Time",
      flex: 0.5,
    },
    {
      field: "DepartureTime",
      headerName: "Departure Time",
      flex: 1,
    },
    {
        field: "Load",
        headerName: "Load",
        flex: 0.4,
    },
    {
        field: "PlatformNo",
        headerName: "Platform No",
        flex: 0.4,
    },
  ];


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRAIN STOPS" subtitle="Entire list of train stops" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            minWidth: "100px !important"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScrollerContent": {
            width: "200px !important"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
            minWidth: "100%",
            overflowX: "hidden",
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
          getRowId={(row) => row.stopID}
          rows={(data && data.trainstops) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch, isSearch: true },
          }}
        />
      </Box>
    </Box>
  )
}

export default TrainStops