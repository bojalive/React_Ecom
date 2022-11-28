import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks"
export const config = {
  endpoint: `https://qkartfrontend.onrender.com/api/v1`,
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/thanks" element={<Thanks/>}/>
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
//dfsdfs
export default App;
