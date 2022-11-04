import ArrowBackIcon from "@mui/icons-material/ArrowBack";
<<<<<<< HEAD
import { Avatar, Button, Stack, Paper, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


let shit = false;
const checkLogged = () => {
  const userName = localStorage.getItem("token");
  if (userName !== null) {
    shit = true;
  }
};
const Header = ({ children, hasHiddenAuthButtons }) => {
  const navigate = useNavigate();
  const logPage = () => {
    localStorage.clear();
    navigate("/Login");
    window.location.reload();
  };
  const regPage = () => {
    localStorage.clear();
    navigate("/register");
  };
 
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      {checkLogged()}
      {!shit && !hasHiddenAuthButtons && (
        <Stack direction="row" spacing={2}>
          <Button onClick={logPage}>Login</Button>
          <Button variant="contained" onClick={regPage}>
            Register
          </Button>
        </Stack>
      )}
      {shit && !hasHiddenAuthButtons && (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
          <Avatar
            src="../../public/avatar.png"
            alt={localStorage.getItem("username")}
          >
            {" "}
          </Avatar>
          <><h4 className="h4align"> <>{localStorage.getItem("username")}</></h4></>
          <Button variant="contained" onClick={logPage}>
            Logout
          </Button>
        </Stack>
      )}
      {hasHiddenAuthButtons && (
=======
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
>>>>>>> e7ef4956fa0d9eed00ff1db4b4fed8bbb6626109
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
<<<<<<< HEAD
          onClick={() => {
            navigate("/");
          }}
        >
          Back to explore
        </Button>
      )}
    </Box>
  );
=======
        >
          Back to explore
        </Button>
      </Box>
    );
>>>>>>> e7ef4956fa0d9eed00ff1db4b4fed8bbb6626109
};

export default Header;
