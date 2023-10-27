"use client";
import BtnElimnar from "./BtnEliminar";
import Link from "next/link";
export default function StockList({ stock }) {
  return (
    <tbody>
      {stock.map((item) => {
        return (
          <tr key={item.stock_id}>
            <td>{item.stock_id}</td>
            <td>{item.producto_nombre}</td>
            <td>{item.producto_descripcion}</td>
            <td>${Number(item.producto_precio).toFixed(2)}</td>
            <td>{item.stock_cantidad}</td>
            <td>
              <Link href={`/producto/${item.producto_id}`}>
                <button type="submit">Atualizar</button>
              </Link>
            </td>
            <td>
              <BtnElimnar producto_id={item.producto_id} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
