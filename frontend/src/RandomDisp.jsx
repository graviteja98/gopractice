import { Paper } from "@mui/material";
import React from "react";

function RandomDisp() {
  let x = Math.random() * 10;
  return (
    <Paper
      elevation={3}
      sx={{
        my: 3,
        backgroundColor: "info.main",
        border: "2em",
        color: "white",
      }}
    >
      {x}
    </Paper>
  );
}

export default RandomDisp;
