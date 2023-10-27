"use client";
import { useState } from "react";
export default function CompTipoProducto() {
  const [descripcion, setDescripcion] = useState(null);
  const [faltanDatos, setFaltanDatos] = useState(false);
  const [mensajeError, setMensajeError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (descripcion == null) {
      setMensajeError("Faltan campos por completar");
      setFaltanDatos(true);
      setTimeout(() => {
        setFaltanDatos(false);
      }, 2000);
    } else {
      const nuevoTipoProducto = {
        descripcion,
      };
      const res = await fetch("/api/addTipoProducto", {
        method: "POST",
        body: JSON.stringify(nuevoTipoProducto),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json().then(() => {
        setDescripcion("");
      });
      console.log(data);
    }
  };
  return (
    <>
      <form className="productoForm" onSubmit={handleSubmit}>
        {faltanDatos ? (
          <div className="alertaCamposInsert">{mensajeError}</div>
        ) : (
          <>
            <p>Crea un nuevo tipo de producto</p>
            <label htmlFor="descripcion">Descripcion:</label>
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />

            <button type="submit">Agregar Producto</button>
          </>
        )}
      </form>
    </>
  );
}
