import React, { useState } from "react";
import {
  Box,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useGetWagonTypeQuery } from "state/trainApi";
import { useTheme } from "@emotion/react";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import ChangeCircleOutlined from "@mui/icons-material/ChangeCircleOutlined";

const TrainMaker = () => {
  const theme = useTheme();
  const [wagons, setWagons] = useState([]);
  const data = useGetWagonTypeQuery();
  console.log("🚀 ~ file: TrainMaker.jsx:31 ~ TrainMaker ~ data:", data);

  const [valueWagon, setValueWagon] = useState(
    data.data !== undefined ? data.data[0].WagonID : ""
  );
  const addWagon = () => {
    setWagons([...wagons, [valueWagon, 0]]);
  };
  const removeWagon = (indexToRemove) => {
    const updatedWagons = wagons.filter((_, index) => index !== indexToRemove);
    setWagons(updatedWagons);
  };

  const toggleDirection = (index) => {
    const updatedWagons = [...wagons];
    updatedWagons[index][1] = 1 - updatedWagons[index][1]; // Toggle between 0 and 1
    setWagons(updatedWagons);
    console.log("##wagons: ",wagons)
  };

  const handleChange = (e) => {
    setValueWagon(e.target.value); // Update the selected value
  };

  return (
    <Box border="1px solid grey" padding="1rem 1.5rem">
      <InputLabel>Configure Wagons</InputLabel>

      <Select
        labelId="wagon-type"
        value={valueWagon || ""}
        onChange={handleChange}
        placeholder="Select wagon type"
        name="valueWagon"
        label="wagon"
        variant="filled"
        sx={{ width: "25vw", margin: "10px 20px 0 0" }}
      >
        {data.data !== undefined ? (
          data.data.map((w) => (
            <MenuItem key={w.WagonID} value={w.WagonID}>
              {w.Class} - {w.Capacity} seats
            </MenuItem>
          ))
        ) : (
          <>
            <MenuItem value="loading">Loading</MenuItem>
          </>
        )}
      </Select>

      <Button onClick={addWagon} color="secondary" variant="contained">
        Add
      </Button>

      <div
        style={{
          display: "flex",
          maxWidth: "80vw",
          margin: "1rem 0",
          paddingBottom: "1rem",
          overflowX: "scroll",
        }}
      >
        {wagons.map((wagon, index) => {
          const matchingData = data.data.find((data) => data.WagonID === wagon[0]);
          return (
            <div
              key={index}
              style={{
                padding: "8px 10px",
                border: `1px solid ${theme.palette.secondary[200]}`,
                margin: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: "15px" }}> Wagon {index + 1} </div>
                <Tooltip title="Remove this wagon">
                  <IconButton
                    onClick={() => {
                      removeWagon(index);
                    }}
                    variant="contained"
                    sx={{
                      color: "lightpink",
                      padding: "1px",
                      marginLeft: "10px",
                      marginBottom: "10px",
                      alignSelf: "end",
                    }}
                  >
                    <CancelOutlined />
                  </IconButton>
                </Tooltip>
              </div>

              <div
                style={{
                  marginTop: "6px",
                }}
              >
                {" "}
                {matchingData.Class}{" "}
              </div>
              <div
                style={{
                  color: theme.palette.primary[300],
                  fontSize: "12px",
                }}
              >
                {" "}
                ({matchingData.Capacity} seats)
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: '5px' }}>
                <div style={{ fontSize: "12px", color: theme.palette.primary[200], marginTop: '4px' }}> Dir: {wagon[1] ? "back": "front" } </div>
                <Tooltip title="Change direction of wagon: whether looking at front of the train or back of the train when seated">
                  <IconButton
                    onClick={() => {
                      toggleDirection(index);
                    }}
                    variant="contained"
                    sx={{
                      color: theme.palette.secondary[300],
                      padding: "1px",
                      marginLeft: "10px",
                      marginBottom: "10px",
                      alignSelf: "end",
                    }}
                  >
                    <ChangeCircleOutlined />
                  </IconButton>
                </Tooltip>
              </div>

            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default TrainMaker;
