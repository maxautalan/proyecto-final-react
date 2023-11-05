import React from "react";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa6";
import Opciones from "./Opciones";
import { useEffect, useState } from "react";
import useCotizador from "../hooks/useCotizador";
import usePresupuestos from "../hooks/usePresupuestos";
import Swal from "sweetalert2";

const Cotizador = () => {
  const [precio, setPrecio] = useState(0);
  const [datos, setDatos] = useState([]);
  const { elementos, setElementos } = useCotizador();
  const { presupuestos, setPresupuestos } = usePresupuestos();

  const realizarCotizacion = () => {
    const { m2, propiedad, ubicacion } = elementos;

    if (m2 < 20 || propiedad === 0 || ubicacion === 0) {
      Swal.fire("Error", "Por favor, complete los datos requeridos", "error");
    } else {
      Swal.fire(
        "Datos ingresados correctamente",
        "En instantes recibirá la cotización",
        "success"
      );
      const cotizacion = 400 * m2 * propiedad * ubicacion;
      setPrecio(cotizacion);
    }
  };

  const guardar = () => {
    setPresupuestos([
      ...presupuestos,
      {
        fecha: new Date().toDateString(),
        ...elementos,
        cotizacion: 400 * elementos.m2 * elementos.propiedad * elementos.ubicacion,
      },
    ]);
    setPrecio(0);
  };

  useEffect(() => {
    const leer = async () => setDatos(await (await fetch("/data.json")).json());
    leer();
  }, []);

  return (
    <>
      <nav>
        <Link to={"/presupuestos"}>
          <FaClipboardList />
        </Link>
        <h5>Historial</h5>
      </nav>

      <h1>Max Seguros del Hogar</h1>
      <h3>Complete los datos y recibirá el importe de su póliza</h3>

      <form action="" onSubmit={(e) => e.preventDefault()}>
        <Opciones
          datos={datos.filter(({ categoria }) => categoria === "propiedad")}
          label={"Seleccione su propiedad"}
          tipo={"propiedad"}
        />
        <Opciones
          datos={datos.filter(({ categoria }) => categoria === "ubicacion")}
          label={"Seleccione su ubicación"}
          tipo={"ubicacion"}
        />

        <label htmlFor="m2">Cantidad de m2</label>
        <input
          type="number"
          id="m2"
          min={20}
          defaultValue={20}
          onInput={(e) => {
            const value = parseInt(e.target.value);
            if (value >= 20) {
              setElementos({
                ...elementos,
                m2: value,
              });
            } else {
              Swal.fire("Error", "La cantidad de m2 debe ser mayor o igual a 20", "error");
            }
          }}
        />
        <button type="button" onClick={realizarCotizacion}>
          Cotizar
        </button>
      </form>

      {precio !== 0 && (
        <>
          <h2>La cotización es de ${precio.toFixed(2)}</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <button type="button" onClick={guardar}>
              Guardar cotización
            </button>
          </form>
          <h3>Para conocer el historial de cotizaciones, presione en el ícono superior</h3>
        </>
      )}
    </>
  );
};

export default Cotizador;
