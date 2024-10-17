import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Card } from "primereact/card";
import "../index.css";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  nombre: string;
  password: string;
  rol: string;
}

function Clientes() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const [users, setUsers] = useState([]);

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
    }
    if(!users){
      navigate('/login')
    }
  };

  // Llamamos a fetchUsers solo una vez cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-column w-full h-screen align-items-center overflow-y-scroll surface-200">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="w-full flex justify-content-center align-items-center gap-2 pt-4">
          <Card className="flex flex-column w-4 overflow-x-hidden overflow-y-hidden">
            {users.map((user: User, index) => (
              <div key={index} className="flex flex-column gap-2">
                <span>Id: {user.id}</span>
                <span>Nombre: {user.nombre}</span>
                <span>Password: {user.password}</span>
                <span>Rol: {user.rol}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
}

export default Clientes;
