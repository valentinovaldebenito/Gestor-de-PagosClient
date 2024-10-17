import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Card } from "primereact/card";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

/* interface User {
  id: number;
  nombre: string;
  password: string;
  rol: string;
} */

function Clientes() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [rolInput, setRolInput] = useState("");

  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4250/users", {
        headers: {
          Authorization: token,
        },
      });
      // Asignamos los datos obtenidos al estado de users
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  // Llamamos a fetchUsers solo una vez cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  async function createUser() {
    try {
      const response = await axios.post(
        "http://localhost:4250/register-user",
        {
          nombre: userInput,
          password: passInput,
          email: emailInput,
          rol: rolInput,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      alert("Usuario creado con exito!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-column w-full h-screen align-items-center surface-200">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="w-full h-full flex flex-column justify-content-center align-items-center gap-2 pt-4">
          <div className="flex justify-content-space-between w-10 py-3">
            <div className="w-6 flex justify-content-start align-items-center">
              <span className="text-2xl font-semibold text-700">Usuarios</span>
            </div>
            <div className="w-6 flex justify-content-end align-items-center">
              <Button
                label="Cargar Usuario"
                icon="pi pi-plus"
                onClick={() => {
                  setVisible(true);
                }}
              ></Button>
            </div>
          </div>
          <Card className="flex flex-column w-10 overflow-x-hidden overflow-y-hidden">
            <DataTable value={users} className="w-full">
              <Column field="id" header="Id" />
              <Column field="nombre" header="Usuario" />
              <Column field="email" header="Email" />
              <Column field="password" header="Contraseña" />
              <Column field="rol" header="Rol" />
            </DataTable>
          </Card>

          <Dialog
            className="w-4 h-auto"
            visible={visible}
            modal
            header="Crear Usuario"
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <div className="flex flex-column w-full justify-content-center align-items-center gap-5 pt-5">
              <FloatLabel className="w-full">
                <InputText className="w-full" id="username" value={userInput} onChange={(e) => setUserInput(e.target.value)} required />
                <label htmlFor="username">Usuario</label>
              </FloatLabel>

              <FloatLabel className="w-full">
                <InputText className="w-full" id="password" value={passInput} onChange={(e) => setPassInput(e.target.value)} required />
                <label htmlFor="password">Contraseña</label>
              </FloatLabel>

              <FloatLabel className="w-full">
                <InputText className="w-full" id="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
                <label htmlFor="email">Email</label>
              </FloatLabel>

              <FloatLabel className="w-full">
                <InputText className="w-full" id="rol" value={rolInput} onChange={(e) => setRolInput(e.target.value)} required />
                <label htmlFor="rol">Rol</label>
              </FloatLabel>
            </div>
            <div className="flex justify-content-end w-full pt-4">
              <Button
                onClick={() => {
                  createUser();
                }}
              >
                Crear
              </Button>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default Clientes;
