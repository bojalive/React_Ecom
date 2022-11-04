import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
=======
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";

>>>>>>> e7ef4956fa0d9eed00ff1db4b4fed8bbb6626109
export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
=======
    <div className="App">
          <Register />
    </div>
>>>>>>> e7ef4956fa0d9eed00ff1db4b4fed8bbb6626109
  );
}

export default App;
