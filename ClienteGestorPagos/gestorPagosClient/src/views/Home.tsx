import { Card } from "primereact/card";
import Navbar from "../components/Navbar";
import "../index.css";

function Home() {
  return (
    <>
      <div className="flex flex-column w-full h-screen surface-200">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="flex justify-content-center align-items-center w-full h-full">
          <Card className="flex justify-content-center w-20rem h20rem">
            <span>Ver info Usuarios</span>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
