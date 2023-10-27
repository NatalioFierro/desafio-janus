"use client";
import Navbar from "@/app/components/nav/NavBar";
import UpdateProductoComp from "@/app/components/producto/UpdateProductoComp";

const fetchStock = () => {
  return fetch("http://127.0.0.1:3000/api/stock", { cache: "no-store" }).then(
    (res) => res.json()
  );
};
const fetchTipoProdu = () => {
  return fetch("http://127.0.0.1:3000/api/getTipoProducto", {
    cache: "no-store",
  }).then((res) => res.json());
};
export default async function UpdateProducto({ params }) {
  const stock = await fetchStock();
  const tipoProducto = await fetchTipoProdu();
  const { producto } = params;
  let stockFiltrado = stock.filter((item) => {
    return item.producto_id === Number(producto);
  });
  let tipoProductoFiltrado = tipoProducto.filter((item) => {
    return item.id === stockFiltrado[0].producto_idTipoProducto;
  });
  return (
    <>
      <Navbar />
      <h1 className="janus">Actualizar Producto</h1>
      <UpdateProductoComp
        tipoProductos={tipoProducto}
        tipoFiltrado={tipoProductoFiltrado[0]}
        stock={stockFiltrado[0]}
      />
    </>
  );
}
