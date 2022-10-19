import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
<<<<<<< HEAD

// TODO: CRIO_TASK_MODULE_REGISTER - Add Target container ID (refer public/index.html)
=======
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";

>>>>>>> 18e1a7584878a339de60b412e34dfe28a89b31f9
ReactDOM.render(
  <React.StrictMode>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          preventDuplicate
        >
          <App />
        </SnackbarProvider>
  </React.StrictMode>,
<<<<<<< HEAD
   document.getElementById('root')
=======
>>>>>>> 18e1a7584878a339de60b412e34dfe28a89b31f9
);
