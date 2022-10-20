import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userName, setUserName] = useState("");
  const [pass, setpass] = useState("");
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const [logged, setlogged] = useState("")
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
=======

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

>>>>>>> 87cebf390493aafc619e78b8de78058180be64ca
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
<<<<<<< HEAD
    const url = `${config.endpoint}/auth/login`;
    setloader(true);
    if (validateInput()) {
      const res = await axios
        .post(url, {
          username: userName,
          password: pass,
        })
        .then((resp) => {
          setUserName("");
          setpass("");
          console.log(resp.data);
          persistLogin(resp.data.token,resp.data.username,resp.data.balance)
          enqueueSnackbar("Logged in successfully");
          navigate("/")
        })
        .catch((error) => {
          if (error.response) {
            enqueueSnackbar(error.response.data.message);
          } else if (error.request) {
            enqueueSnackbar(error.request);
          } else {
            enqueueSnackbar(error.message);
          }
        });
    }
    
    setloader(false);
   
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
=======
  };

>>>>>>> 87cebf390493aafc619e78b8de78058180be64ca
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
<<<<<<< HEAD
    if (userName === "") {
      enqueueSnackbar(`Username is a required field`);
      return false;
    } else if (pass === "") {
      enqueueSnackbar(`Password is a required field`);
      return false;
    }

    return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
=======
  };

>>>>>>> 87cebf390493aafc619e78b8de78058180be64ca
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
<<<<<<< HEAD

    localStorage.setItem('token',token)
    localStorage.setItem('username',username)
    localStorage.setItem('balance',balance)

  };

  const progressBar = () => {
    console.log(loader);
    if (loader) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    } else {
      return (
        <Button variant="contained" onClick={login}>
          Login
        </Button>
      );
    }
=======
>>>>>>> 87cebf390493aafc619e78b8de78058180be64ca
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
<<<<<<< HEAD
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            sx={{
              paddingBottom: 3,
            }}
            UserName
            id="outlined-required"
            label="UserName"
            defaultValue=""
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <TextField
            sx={{
              paddingBottom: 3,
            }}
            password
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
          {progressBar()}
          <p className="secondary-action">
            Don't have an account?{" "}
            <a className="link" href="#">
              Login here
            </a>
          </p>
=======
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
>>>>>>> 87cebf390493aafc619e78b8de78058180be64ca
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
