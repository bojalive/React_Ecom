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

>>>>>>> 87cebf390493aafc619e78b8de78058180be64ca
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
>>>>>>> 87cebf390493aafc619e78b8de78058180be64ca
  );
}

export default App;
