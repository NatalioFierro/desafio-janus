"use client";
import StockList from "./StockList";
const fetchStock = () => {
  return fetch("http://127.0.0.1:3000/api/stock", { cache: "no-store" }).then(
    (res) => res.json()
  );
};

export default async function StockComp() {
  let stock = await fetchStock();

  return (
    <>
      {stock.length > 0 ? (
        <div className="tabla-producto">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <StockList stock={stock} />
          </table>
        </div>
      ) : (
        <h2 className="janus">No se ha encontrado productos en stock</h2>
      )}
    </>
  );
}
