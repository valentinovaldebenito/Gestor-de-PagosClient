import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./views/Home";
import Login from "./views/Login";
import Pagos from "./views/Pagos";
import Clientes from "./views/Clientes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/clientes" Component={Clientes} />
          <Route path="/login" Component={Login} />
          <Route path="/pagos" Component={Pagos} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
