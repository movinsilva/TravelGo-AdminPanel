import React, {useState} from 'react'
import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from 'components/Header';
import { useGetStationQuery } from 'state/api';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ScheduleForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const data = useGetStationQuery();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };
    

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const [invertedStations, setInvertedStations] = useState([]);
  const customHandleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInvertedStations(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box m="20px">
    <Header title="CREATE TRAIN SCHEDULE" subtitle="Create a New Train Schedule" />

    <Box mt="40px">
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Train Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.trainNo}
              name="trainNo"
              error={!!touched.trainNo && !!errors.trainNo}
              helperText={touched.trainNo && errors.trainNo}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Train Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.trainName}
              name="trainName"
              error={!!touched.trainName && !!errors.trainName}
              helperText={touched.trainName && errors.trainName}
              sx={{ gridColumn: "span 4" }}
            />
            <InputLabel id="source" variant='filled'>Source Station</InputLabel>
            <Select
                labelId="source"
                value={values.source}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Source Station"
                variant='filled'
                sx={{ gridColumn: "span 3"}}
            >
                {(data.data !== undefined) ? data.data.map((station) => (
                    <MenuItem value={station.StationID}>{station.StationName}</MenuItem>
                )) : <></>}

            </Select>
            <InputLabel id="dest" variant='filled'>Destination Station</InputLabel>
            <Select
                labelId="dest"
                value={values.source}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Source Station"
                variant='filled'
                sx={{ gridColumn: "span 3"}}
            >
                {(data.data !== undefined) ? data.data.map((station) => (
                    <MenuItem value={station.StationID}>{station.StationName}</MenuItem>
                )) : <></>}
            </Select>

            
            <InputLabel id="frequency" variant='filled'>Frequency</InputLabel>
            <Select
                labelId="frequency"
                value={values.frequency}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Frequency"
                variant='filled'
                sx={{ gridColumn: "span 3"}}
            >
            </Select>
            
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Train Type"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.trainType}
              name="trainType"
              error={!!touched.trainType && !!errors.trainType}
              helperText={touched.trainType && errors.trainType}
              sx={{ gridColumn: "span 4" }}
            />

            <InputLabel id="inverted-label" variant='filled'>Inverted Station</InputLabel>
            <Select
                labelId="inverted-label"
                id='inverted'
                value={invertedStations}
                onBlur={handleBlur}
                onChange={customHandleChange}
                label="Source Station"
                variant='filled'
                multiple
                MenuProps={MenuProps}
                sx={{ gridColumn: "span 7"}}
            >
                {(data.data !== undefined) ? data.data.map((station) => (
                    <MenuItem value={station.StationID}>{station.StationName}</MenuItem>
                )) : <></>}
            </Select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label="Arrival Time" value={values.arrivalTime} sx={{ gridColumn: "span 2"}} />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <TimePicker label="Departure Time" variant="filled" value={values.departureTime} sx={{ gridColumn: "span 2"}} />
            </LocalizationProvider>
            
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New Train Schedule
            </Button>
          </Box>
        </form>
      )}
    </Formik>
    </Box>
  </Box>
  )
}

const checkoutSchema = yup.object().shape({
    trainNo: yup.string().required("required"),
    trainName: yup.string().required("required"),
    trainType: yup.string().required("required"),
    contact: yup
      .string()
      .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
  });
  const initialValues = {
    trainNo: "",
    trainName: "",
    trainType: "",
    contact: "",
    address1: "",
    address2: "",
  };

export default ScheduleForm