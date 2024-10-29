import axios from "axios";
import Navbar from "../components/Navbar";
import "../index.css";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";

interface IComprobante {
  base64: string,
  mimeType: string
}

function Pagos() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [pagos, setPagos] = useState([]);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [fechaPago, setFechaPago] = useState(null);
  const [metodoPago, setMetodoPago] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [monto, setMonto] = useState<number>(0);
  const [activo, setActivo] = useState<boolean>(true);
  const [comprobante, setComprobante] = useState<IComprobante>();

  const fetchPagos = async () => {
    try {
      const response = await axios.get("http://localhost:4250/pagos", {
        headers: {
          Authorization: token,
        },
      });
      setPagos(response.data);
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setComprobante({
        base64: reader?.result ? reader.result : "", // Archivo en base64
        mimeType: file.type,   // Tipo MIME del archivo
      });
    };
  
    reader.readAsDataURL(file);
  };

  const cargarPago = async () => {
    if (!fechaPago || !metodoPago || !descripcion || !monto || !comprobante) {
      alert("Debe completar todos los campos");
      return;
    }

    console.log("Comprobante: ", comprobante)
    console.log("MimeType: ", comprobante.mimeType)

    try {
      const response = await axios.post(
        "http://localhost:4250/pagos",
        {
          fechaPago,
          metodoPago,
          descripcion,
          monto,
          activo,
          comprobante, // ya en formato base64
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setPagos([...pagos, response.data]);
      setDisplayDialog(false); // Cierra el diálogo tras cargar el pago
    } catch (error) {
      console.error("Error al cargar el pago:", error);
    }
  };

  return (
    <>
      <div className="flex flex-column w-full h-screen surface-200">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="w-full h-full flex flex-column justify-content-center align-items-center">
          <div className="flex justify-content-space-between w-10 py-3">
            <div className="w-6 flex justify-content-start align-items-center">
              <span className="text-2xl font-semibold text-700">Pagos</span>
            </div>
            <div className="w-6 flex justify-content-end align-items-center">
              <Button label="Cargar Pago" icon="pi pi-plus" onClick={() => setDisplayDialog(true)} />
            </div>
          </div>
          <Card className="flex flex-column w-10 overflow-x-hidden overflow-y-hidden">
            <DataTable value={pagos} className="w-full">
              <Column field="id" header="Id" />
              <Column field="fechaPago" header="Fecha de Pago" body={(rowData) => new Date(rowData.fechaPago).toLocaleDateString()} />
              <Column field="descripcion" header="Descripción" />
              <Column field="metodoPago" header="Método de Pago" />
              <Column field="monto" header="Monto" />
              <Column field="createdAt" header="Fecha Carga" body={(rowData) => new Date(rowData.createdAt).toLocaleDateString()} />
            </DataTable>
          </Card>
        </div>
      </div>
      <Dialog className="w-4" header="Cargar Pago" draggable={false} visible={displayDialog} onHide={() => setDisplayDialog(false)}>
        <div className="flex flex-column align-items-center w-full gap-3">
          <Calendar className="w-full" value={fechaPago} onChange={(e) => setFechaPago(e.value)} placeholder="Fecha de Pago" />
          <InputText className="w-full" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} placeholder="Método de Pago" />
          <InputText className="w-full" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" />
          <InputNumber className="w-full" value={monto} onValueChange={(e) => setMonto(e.value)} placeholder="Monto" />

          <div className="flex w-full">
            <div className="w-6 flex">
              <FileUpload name="comprobante" customUpload uploadHandler={handleFileUpload} mode="basic" auto chooseLabel="Cargar PDF" />
            </div>
            <div className="w-6 flex justify-content-end">
              <Button label="Guardar" icon="pi pi-check" onClick={cargarPago} />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Pagos;
