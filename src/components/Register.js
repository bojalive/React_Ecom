import { ConstructionOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { logDOM } from "@testing-library/dom";
import axios, { Axios } from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useNavigate  } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userName, setuserName] = useState("");
  const [pass, setpassword] = useState("");
  const [cpass, setcpassword] = useState("");
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    const url = `${config.endpoint}/auth/register`;
    setloader(true);
    
    if (validateInput()) {
      const res = await axios
        .post(url, {
          username: userName,
          password: pass,
        })
        .then((http1) => {
          setcpassword("");
          setpassword("");
          setuserName("");
          console.log(http1.data);
          //snack
          enqueueSnackbar(`Success User has Been Created`);
          navigate("/Login")
        })
        .catch(function (error) {
          if (error.response) {
            enqueueSnackbar(error.response.data.message);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            enqueueSnackbar(error.request);
          } else {
            enqueueSnackbar(error.message);
          }
          //enqueueSnackbar(error.config);
        });

       
        
        
    }
    setloader(false);
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if (userName === "") {
      enqueueSnackbar("Username is a required field");
      return false;
    } else if (userName.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters");
      return false;
    } else if (pass === "") {
      enqueueSnackbar("Password is a required field");
      return false;
    } else if (pass.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters");
      return false;
    } else if (pass !== cpass) {
      enqueueSnackbar("Passwords do not match");
      return false;
    } else {
      return true;
    }
  };

  const renderAuthButton = () => {
    if (loader) {     
      return ( <Box sx={{ display: "flex", justifyContent:'center' }}>
      <CircularProgress />
    </Box>);
    } else {
      return (<Button className="button" variant="contained" onClick={register}>
      Register Now
    </Button>);
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            value={userName}
            placeholder="Enter Username"
            fullWidth
            onChange={(e) => {
              setuserName(e.target.value);
            }}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            value={pass}
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={cpass}
            onChange={(e) => {
              setcpassword(e.target.value);
            }}
          />      
         {renderAuthButton()}
          <p className="secondary-action">
            Already have an account?{" "}
            <a className="link" href="Login">
              Login here
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
