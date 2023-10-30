import React from "react";
import {
  Box,
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Formik, yupToFormErrors } from "formik";
import * as yup from "yup";
import Header from "components/Header";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCreateWagonMutation } from "state/trainApi";
import { useNavigate } from "react-router-dom";

const WagonForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createWagon, { isLoading }] = useCreateWagonMutation();
  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    console.log(
      "🚀 ~ file: WagonForm.jsx:21 ~ handleFormSubmit ~ values:",
      values
    );
    
    try {
        const res = await createWagon({
            Capacity: values.seatCapacity,
            Description: values.description,
            Class: values.wagonClass,
            HasTables: values.hasTables,
            Amenities: values.amenities,
            SeatNoScheme: values.seatScheme
        }).unwrap();
        console.log("🚀 ~ file: WagonForm.jsx:37 ~ handleFormSubmit ~ res:", res)

        toast.success("successfully created new wagon type!");
        navigate("/wagons");
    } catch (err) {
        console.log("🚀 ~ file: WagonForm.jsx:44 ~ handleFormSubmit ~ err:", err)
        toast.error(err.data.message);
    }
    
  };

  return (
    <Box m="20px">
      <Header title="CREATE WAGON TYPE" subtitle="Create a New Wagon Type" />

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
            setValues,
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
                  label="Wagon Class"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.wagonClass}
                  name="wagonClass"
                  error={!!touched.wagonClass && !!errors.wagonClass}
                  helperText={touched.wagonClass && errors.wagonClass}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="No. of seats available"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.seatCapacity}
                  name="seatCapacity"
                  error={!!touched.seatCapacity && !!errors.seatCapacity}
                  helperText={touched.seatCapacity && errors.seatCapacity}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 8" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  multiline="true"
                  label="Seat Scheme"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.seatScheme}
                  name="seatScheme"
                  error={!!touched.seatScheme && !!errors.seatScheme}
                  helperText={touched.seatScheme && errors.seatScheme}
                  sx={{ gridColumn: "span 8" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={values.hasTables}
                      value={values.hasTables}
                      name="hasTables"
                      onChange={handleChange}
                    />
                  }
                  label="Are there tables in the wagon?"
                  sx={{ gridColumn: "span 4", marginLeft: "3%" }}
                />

                <div style={{ gridColumn: "span 4" }}></div>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Amenity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newAmenity}
                  name="newAmenity"
                  sx={{ gridColumn: "span 4" }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    if (values.newAmenity) {
                      setValues({
                        ...values,
                        amenities: [...values.amenities, values.newAmenity],
                        newAmenity: "", // Clear the input field after adding
                      });
                    }
                  }}
                  sx={{ gridColumn: "span 2", margin: '5px 20px' }}
                >
                  Add Amenity
                </Button>

                <Box gridColumn="span 8">
                  <InputLabel>Added Amenities:</InputLabel>
                  <ul>
                    {values.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </Box>

                <div style={{ gridColumn: "span 4" }}></div>
              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create New Wagon Type
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
  wagonClass: yup.string().required("Class is required"),
});

const initialValues = {
  wagonClass: "",
  seatCapacity: "",
  description: "",
  hasTables: false,
  newAmenity: "",
  amenities: [],
};

export default WagonForm;
