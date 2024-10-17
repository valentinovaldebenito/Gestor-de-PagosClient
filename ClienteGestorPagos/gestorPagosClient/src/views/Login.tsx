import "../index.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

let token;

function Login() {
  const navigate = useNavigate();
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");

  //Hacemos una request a la ruta /login y le enviamos los datos del form
  const handleSubmit = async () => {
    if (!userValue || !passValue) {
      alert("Debe completar ambos campos!");
    } else {
      try {
        console.log(userValue, passValue);
        const response = await axios.post("http://localhost:4250/login", {
          nombre: userValue,
          password: passValue,
        });

        //Recibimos el JWT y lo guardamos en el localStorage
        token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="flex justify-content-center align-items-center w-full h-screen bg-black-alpha-90">
        <Card className="flex flex-column align-items-center gap-2 w-20rem h-20rem border-2 border-solid border-blue-500">
          <div className="w-full text-center pb-4">
            <span className="text-2xl">Login</span>
          </div>
          <div className="w-full h-full flex flex-column align-items-center justify-content-center pt-2 gap-5">
            <FloatLabel>
              <InputText id="username" value={userValue} onChange={(e) => setUserValue(e.target.value)} required />
              <label htmlFor="username">Usuario</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="password" value={passValue} onChange={(e) => setPassValue(e.target.value)} required />
              <label htmlFor="password">Contraseña</label>
            </FloatLabel>
          </div>
          <div className="w-full flex justify-content-end pt-5">
            <Button onClick={handleSubmit}>Ingresar</Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Login;
