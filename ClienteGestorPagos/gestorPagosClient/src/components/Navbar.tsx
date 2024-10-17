import React from "react";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import "../index.css";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  function navegar(ruta: string) {
    navigate("/" + ruta);
  }

  async function logout() {
    try {
      const token = localStorage.getItem("token") || null;

      await axios.post(
        "http://localhost:4250/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(() => {
        localStorage.removeItem("token");
        console.log("Logout exitoso");
        navigate('/login')
      });

    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const startContent = (
    <React.Fragment>
      <span className="text-white font-bold text-2xl ml-2">Gestor de Pagos</span>
    </React.Fragment>
  );

  const endContent = (
    <React.Fragment>
      <Button
        label="Usuarios"
        icon="pi pi-user"
        className="mr-2 bg-blue-700 text-white border-none"
        onClick={() => navegar("clientes")}
      />
      <Button
        label="Pagos"
        icon="pi pi-receipt"
        className="mr-2 bg-blue-700 text-white border-none"
        onClick={() => navegar("pagos")}
      />
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        className="bg-blue-700 text-white border-none"
        onClick={() => logout()}
      />
    </React.Fragment>
  );

  return (
    <div className="w-full h-[10%] flex align-items-center m-0 p-0">
      <Toolbar
        className="bg-blue-600 w-full h-auto flex align-items-center border-none border-noround m-0"
        start={startContent}
        end={endContent}
      ></Toolbar>
    </div>
  );
}

export default Navbar;
