import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
import usePresupuestos from "../hooks/usePresupuestos";
import Presupuesto from "./Presupuesto";

const Presupuestos = () => {
  const { presupuestos } = usePresupuestos();

  return (
    <>
    <h1>Max Seguros del Hogar</h1>
    <h2>Historial de Cotizaciones</h2>
      <nav>
        <Link to={"/"}>
          <FaHouse />
        </Link>
        <h5> Volver al Inicio</h5>
      </nav>
      <ul>
        {presupuestos.map((elemento, indice) => (
          <Presupuesto key={indice} {...elemento} />
        ))}
      </ul>
    </>
  );
};

export default Presupuestos;
