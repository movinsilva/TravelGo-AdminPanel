import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateFrequencyMutation } from "state/trainApi";

const FrequencyForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

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

  const navigate = useNavigate();

  const [createFrequncy, { isLoading }] = useCreateFrequencyMutation();

  const handleFormSubmit = async (values) => {

    try {
      const res = await createFrequncy({
        frequencyName: values.frequencyName,
        monday: values.isMonday,
        tuesday: values.isTuesday,
        wednesday: values.isWednesday,
        thursday: values.isThursday,
        friday: values.isFriday,
        saturday: values.isSaturday,
        sunday: values.isSunday,
      }).unwrap();

      toast.success("successfully created new frequency!");
      navigate("/addschedule");
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="CREATE NEW FREQUENCY"
        subtitle="Create a Frequency for Train Schedules"
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
                  label="Frequency Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.frequencyName}
                  name="frequencyName"
                  error={!!touched.frequencyName && !!errors.frequencyName}
                  helperText={touched.frequencyName && errors.frequencyName}
                  sx={{ gridColumn: "span 6" }}
                />

                <div style={{ gridColumn: "span 2" }}></div>

                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={values.isMonday}
                      value={values.isMonday}
                      name="isMonday"
                      onChange={handleChange}
                    />
                  }
                  label="Monday"
                  sx={{ gridColumn: "span 2", marginLeft: "3%" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={values.isTuesday}
                      value={values.isTuesday}
                      name="isTuesday"
                      onChange={handleChange}
                    />
                  }
                  label="Tuesday"
                  sx={{ gridColumn: "span 2", marginLeft: "3%" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={values.isWednesday}
                      value={values.isWednesday}
                      name="isWednesday"
                      onChange={handleChange}
                    />
                  }
                  label="Wednesday"
                  sx={{ gridColumn: "span 4", marginLeft: "3%" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={values.isThursday}
                      value={values.isThursday}
                      name="isThursday"
                      onChange={handleChange}
                    />
                  }
                  label="Thursday"
                  sx={{ gridColumn: "span 2", marginLeft: "3%" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={values.isFriday}
                      value={values.isFriday}
                      name="isFriday"
                      onChange={handleChange}
                    />
                  }
                  label="Friday"
                  sx={{ gridColumn: "span 2", marginLeft: "3%" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={values.isSaturday}
                      value={values.isSaturday}
                      name="isSaturday"
                      onChange={handleChange}
                    />
                  }
                  label="Saturday"
                  sx={{ gridColumn: "span 4", marginLeft: "3%" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={values.isSunday}
                      value={values.isSunday}
                      name="isSunday"
                      onChange={handleChange}
                    />
                  }
                  label="Sunday"
                  sx={{ gridColumn: "span 2", marginLeft: "3%" }}
                />
              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create New Frequency
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
  frequencyName: yup.string().required("required"),
});
const initialValues = {
  frequencyName: "",
  isMonday: false,
  isTuesday: false,
  isWednesday: false,
  isThursday: false,
  isFriday: false,
  isSaturday: false,
  isSunday: false,
};

export default FrequencyForm;
