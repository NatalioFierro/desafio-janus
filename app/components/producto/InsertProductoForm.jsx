"use client";
import { useState } from "react";
function ProductForm({ tipoProductos }) {
  const [tipoProducto, setTipoProducto] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [precio, setPrecio] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [faltanDatos, setFaltanDatos] = useState(false);
  const [esNegativo, setEsNegativo] = useState(false);
  const [mensajeError, setMensajeError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      tipoProducto == null ||
      nombre == null ||
      precio == null ||
      cantidad == null
    ) {
      setMensajeError("Faltan campos por completar");
      setFaltanDatos(true);
      setTimeout(() => {
        setFaltanDatos(false);
      }, 2000);
    } else if (precio < 0 || cantidad < 0) {
      setMensajeError("El precio y la cantidad no pueden ser menores a 0");
      setEsNegativo(true);
      setTimeout(() => {
        setEsNegativo(false);
      }, 2000);
    } else {
      setFaltanDatos(false);
      setEsNegativo(false);
      const nuevoProducto = {
        tipoProducto,
        nombre,
        precio: parseFloat(precio),
        cantidad,
      };
      const res = await fetch("/api/addProducto", {
        method: "POST",
        body: JSON.stringify(nuevoProducto),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json().then(() => {
        setTipoProducto("");
        setNombre("");
        setPrecio("");
        setCantidad("");
      });
      console.log(data);
    }
  };

  return (
    <form className="productoForm" onSubmit={handleSubmit}>
      {faltanDatos || esNegativo ? (
        <div className="alertaCamposInsert">{mensajeError}</div>
      ) : (
        <>
          <label htmlFor="tipoProducto">Selecciona una opción: </label>
          <select
            id="tipoProducto"
            value={tipoProducto}
            onChange={(e) => setTipoProducto(e.target.value)}
          >
            <option value="">Selecciona un tipo de producto</option>
            {tipoProductos.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.descripcion}
                </option>
              );
            })}
          </select>
          <label htmlFor="nombre">Nombre del Producto:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />

          <button type="submit">Agregar Producto</button>
        </>
      )}
    </form>
  );
}

export default ProductForm;
