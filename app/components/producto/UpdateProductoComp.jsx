"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
function UpdateProductoComp({ tipoProductos, tipoFiltrado, stock }) {
  const [id, setId] = useState(stock.producto_id);
  const [tipoProducto, setTipoProducto] = useState(tipoFiltrado.id);
  const [nombre, setNombre] = useState(stock.producto_nombre);
  const [precio, setPrecio] = useState(stock.producto_precio);
  const [cantidad, setCantidad] = useState(stock.stock_cantidad);
  const [faltanDatos, setFaltanDatos] = useState(false);
  const [esNegativo, setEsNegativo] = useState(false);
  const [mensajeError, setMensajeError] = useState(null);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tipoProducto == "" || nombre == "" || precio == "" || cantidad == "") {
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
      tipoProducto == null ? setTipoProducto(tipoFiltrado.id) : false;
      const nuevoProducto = {
        id,
        tipoProducto: Number(tipoProducto),
        nombre,
        precio: parseFloat(precio),
        cantidad,
      };
      const res = await fetch("/api/updateProducto", {
        method: "PUT",
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
        router.push("/stock");
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

          <button type="submit">Actualizar Producto</button>
        </>
      )}
    </form>
  );
}

export default UpdateProductoComp;
