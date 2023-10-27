"use client";
import InsertProductoForm from "./InsertProductoForm";
import Link from "next/link";

const fetchTipoProdu = () => {
  return fetch("http://127.0.0.1:3000/api/getTipoProducto", {
    cache: "no-store",
  }).then((res) => res.json());
};

export default async function TipoProducto() {
  const tipoP = await fetchTipoProdu();

  return (
    <>
      <div className="tipoProductoLink">
        <Link href={"/tipoProducto"}>Cargar tipo de productos</Link>
      </div>
      {tipoP.length > 0 ? (
        <InsertProductoForm tipoProductos={tipoP} />
      ) : (
        <h2 className="janus">Primero debes cargar los tipos de productos</h2>
      )}
    </>
  );
}
