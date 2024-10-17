import axios from "axios";
import Navbar from "../components/Navbar";
import "../index.css";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Pago {
  id: number;
  fechaPago: string;
  metodoPago: string;
  descripcion: string;
  monto: number;
  createdAt: string;
}

function Pagos() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const [pagos, setPagos] = useState([]);

  const fetchPagos = async () => {
    try {
      const response = await axios.get("http://localhost:4250/pagos", {
        headers: {
          Authorization: token,
        },
      });
      // Asignamos los datos obtenidos al estado de pagos
      setPagos(response.data);
    } catch (err) {
      console.error(err);
      navigate('/login')
    }
  };

  // Llamamos a fetchPagos solo una vez cuando el componente se monta
  useEffect(() => {
    fetchPagos();
  }, []);

  return (
    <>
      <div className="flex flex-column w-full h-screen surface-200">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="w-full h-[90%]">
          <Card className="flex flex-column w-4 overflow-x-hidden overflow-y-hidden">
            {pagos.map((pago: Pago, index) => (
              <div key={index} className="flex flex-column gap-2">
                <span>Id: {pago.id}</span>
                <span>Descripción: {pago.descripcion}</span>
                <span>Método de Pago: {pago.metodoPago}</span>
                <span>Monto: {pago.monto}</span>
                <span>Fecha Creación: {pago.createdAt}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
}

export default Pagos;
