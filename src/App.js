import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
<<<<<<< HEAD
=======
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
>>>>>>> 18e1a7584878a339de60b412e34dfe28a89b31f9

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
=======
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
>>>>>>> 18e1a7584878a339de60b412e34dfe28a89b31f9
          <Register />
    </div>
  );
}

export default App;
