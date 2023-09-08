import { Typography, Box, useTheme, Button } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";

const Header = ({ title, subtitle, buttonFunc }) => {
  const theme = useTheme();
  return (
    <FlexBetween>
      <Box>
        <Typography
          variant="h2"
          color={theme.palette.secondary[100]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={theme.palette.secondary[300]}>
          {subtitle}
        </Typography>
      </Box>

      {buttonFunc ? (
        <>
          <Button
            onClick={buttonFunc}
            sx={{
              backgroundColor: `${theme.palette.secondary[300]}`,
              padding: "10px 30px",
              "&:hover": {
                backgroundColor: `${theme.palette.primary[400]}`,
                color: "white",
              },
            }}
          >
            Add new
          </Button>
        </>
      ) : (
        <></>
      )}
    </FlexBetween>
  );
};

export default Header;
