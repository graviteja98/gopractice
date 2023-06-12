import React, { useEffect, useState } from "react";

import {
  Button,
  CircularProgress,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";
import RandomDisp from "./RandomDisp";
import TimeDisplay from "./TimeDisplay";

const Index = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [circ, setCirc] = useState(false);
  const [data, setData] = useState([]);
  const [sign, setSign] = useState(false);
  console.log("re rendereing");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form submission logic here
    try {
      const response = await axios.post("http://localhost:8008/users/add", {
        name,
        password,
      });
      setName("");
      setPassword("");
      setSign(!sign);
    } catch (e) {
      console.log(e);
    }
    console.log("Name:", name);
    console.log("Password:", password);
  };
  const getUsers = async () => {
    console.log("getting users......");
    setCirc(true);
    try {
      const response = await axios.get("http://localhost:8008/users");
      console.log(response.data);
      setData(response.data);
      setCirc(false);
    } catch (e) {
      console.log(e);
      setCirc(false);
    }
  };

  useEffect(() => {
    getUsers();
    console.log("useeffect");
  }, [sign]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
      <TimeDisplay/>
    <RandomDisp/>
      {/* <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2, backgroundColor: "error.main" }}
        onClick={getUsers}
      >
        Show users
      </Button> */}
      {circ && <CircularProgress />}
      {data?.map((r, index) => (
        <Paper key={index} elevation={5} sx={{ my: 2 }}>
          <Typography variant="body1">
            {r.id},{r.username},{r.password}
          </Typography>
        </Paper>
      ))}
    </>
  );
};

export default Index;
