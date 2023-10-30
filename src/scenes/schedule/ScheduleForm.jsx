import React, { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import {
  useCreateTrainScheduleMutation,
  useGetStationQuery,
  useGetTrainFrequencyQuery,
} from "state/trainApi";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TrainMaker from "components/trainmaker/TrainMaker";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ScheduleForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const data = useGetStationQuery();
  const frequencyData = useGetTrainFrequencyQuery();
  const [wagons, setWagons] = useState([]);
  const [createTrainSchedule, { isLoading }] = useCreateTrainScheduleMutation();
  const [invertedStations, setInvertedStations] = useState([]);
  const navigate = useNavigate();


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



  const handleFormSubmit = async (values) => {

    try {
      const res = await createTrainSchedule({
        trainNo: values.trainNo,
        trainName: values.trainName,
        source: values.source,
        dest: values.dest,
        arrivalTime: values.arrivalTime,
        departureTime: values.departureTime,
        frequency: values.frequency,
        defaultWagonsWithDirection: wagons,
        invertedStations: invertedStations,
        trainType: values.trainType,
      }).unwrap();

      toast.success("successfully created train schedule!")
      navigate("/trainschedule")
    } catch (err) {
        toast.error(err.data.message)
        
    }

    

  };

  const customHandleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInvertedStations(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };



  return (
    <Box m="20px">
      <Header
        title="CREATE TRAIN SCHEDULE"
        subtitle="Create a New Train Schedule"
      />

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

                <InputLabel
                  id="source"
                  variant="filled"
                  error={!!touched.source && !!errors.source}
                  helperText={touched.source && errors.source}
                >
                  Source Station
                </InputLabel>
                <Select
                  labelId="source"
                  value={values.source}
                  name="source"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Source Station"
                  variant="filled"
                  error={!!touched.source && !!errors.source}
                  helperText={touched.source && errors.source}
                  sx={{ gridColumn: "span 3" }}
                >
                  {data.data !== undefined ? (
                    data.data.map((station) => (
                      <MenuItem value={station.StationID}>
                        {station.StationName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Loading..</MenuItem>
                  )}
                </Select>

                <InputLabel
                  id="dest"
                  variant="filled"
                  error={!!touched.dest && !!errors.dest}
                  helperText={touched.dest && errors.dest}
                >
                  Destination Station
                </InputLabel>
                <Select
                  labelId="dest"
                  value={values.dest}
                  onBlur={handleBlur}
                  name="dest"
                  onChange={handleChange}
                  label="Source Station"
                  variant="filled"
                  error={!!touched.dest && !!errors.dest}
                  helperText={touched.dest && errors.dest}
                  sx={{ gridColumn: "span 3" }}
                >
                  {data.data !== undefined ? (
                    data.data.map((station) => (
                      <MenuItem value={station.StationID}>
                        {station.StationName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Loading..</MenuItem>
                  )}
                </Select>

                <InputLabel 
                id="frequency" 
                variant="filled"
                error={!!touched.frequency && !!errors.frequency}
                  helperText={touched.frequency && errors.frequency}>
                  Frequency
                </InputLabel>
                <Select
                  labelId="frequency"
                  name="frequency"
                  value={values.frequency}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Frequency"
                  variant="filled"
                  error={!!touched.frequency && !!errors.frequency}
                  helperText={touched.frequency && errors.frequency}
                  sx={{ gridColumn: "span 3" }}
                >
                  {frequencyData.data !== undefined ? (
                    frequencyData.data.map((freq) => (
                      <MenuItem value={freq.FrequencyID}>{freq.Name}</MenuItem>
                    ))
                  ) : (
                    <MenuItem>Frequencies are loading ..</MenuItem>
                  )}
                </Select>

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    navigate("/addfrequency")
                  }}
                  sx={{ gridColumn: "span 2", margin: "8px 1rem" }}
                >
                  Add new frequency
                </Button>

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
                <div style={{ gridColumn: "span 4" }}></div>

                <InputLabel id="inverted-label" variant="filled">
                  Inverted Station
                </InputLabel>
                <Select
                  labelId="inverted-label"
                  id="inverted"
                  value={invertedStations}
                  onBlur={handleBlur}
                  onChange={customHandleChange}
                  label="Inverted Station"
                  variant="filled"
                  multiple
                  MenuProps={MenuProps}
                  sx={{ gridColumn: "span 7" }}
                >
                  {data.data !== undefined ? (
                    data.data.map((station) => (
                      <MenuItem value={station.StationID}>
                        {station.StationName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Loading..</MenuItem>
                  )}
                </Select>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Arrival Time"
                    value={values.arrivalTime}
                    error={!!touched.arrivalTime && !!errors.arrivalTime}
                  helperText={touched.arrivalTime && errors.arrivalTime}
                    onChange={(newArrivalTime) => {
                      // Manually update the arrivalTime field in Formik's values
                      handleChange({
                        target: {
                          name: "arrivalTime",
                          value: newArrivalTime.$d,
                        },
                      });
                    }}
                    sx={{ gridColumn: "span 2" }}
                    slotProps={{ textField: { error: false } }}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Departure Time"
                    variant="filled"
                    value={values.departureTime}
                    error={!!touched.departureTime && !!errors.departureTime}
                  helperText={touched.departureTime && errors.departureTime}
                    onChange={(newDepartureTime) => {
                      // Manually update the departureTime field in Formik's values
                      handleChange({
                        target: {
                          name: "departureTime",
                          value: newDepartureTime.$d,
                        },
                      });
                    }}
                    sx={{ gridColumn: "span 2" }}
                    slotProps={{ textField: { error: false } }}
                  />
                </LocalizationProvider>
              </Box>

              <Box m="2rem 0">
                <TrainMaker wagons={wagons} setWagons={setWagons} />
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
  );
};

const checkoutSchema = yup.object().shape({
  trainNo: yup.string().required("required"),
  trainName: yup.string().required("Train Name is required"),
  trainType: yup.string().required("Train Type is required"),
  source: yup.string().required("Source Station is required"),
  dest: yup.string().required("Destination Station is required"),
  frequency: yup.string().required("Frequency is required"),
  arrivalTime: yup.string().required("Arrival Time is required"),
  departureTime: yup.string().required("Departure Time is required"),
});
const initialValues = {
  trainNo: "",
  trainName: "",
  trainType: "",
  source: "",
  dest: "",
  frequency: "",
  arrivalTime: "",
  departureTime: "",
};

export default ScheduleForm;
