import React, { useState, useEffect } from "react";
import RandomDisp from "./RandomDisp";
import { Box, Paper, Typography } from "@mui/material";

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    // Update the current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Clean up the timer when the component is unmounted
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{my:4}}>
      <Paper elevation={10} sx={{ backgroundColor: "success.light" }}>
        {" "}
        <Typography varint="h6"> {currentTime}</Typography>
      </Paper>
      <RandomDisp />{" "}
    </Box>
  );
};

export default TimeDisplay;
