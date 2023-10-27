import { createServer } from "http";
import next from "next";
import express from "express";
import { conexion } from "./conexion.mjs";
import cors from "cors";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(express.json());
  conexion.connect(function (err) {
    if (err) {
      throw err;
    }
  });

  server.get("/api/stock", (req, res) => {
    let sql = "SELECT * FROM vw_stockproducto";
    conexion.query(sql, (err, result) => {
      res.send(result);
    });
  });

  server.post("/api/addProducto", (req, res) => {
    const data = req.body;
    const idTipoProducto = data.tipoProducto;
    const nombre = data.nombre;
    const precio = data.precio;
    const cantidad = data.cantidad;

    const sql = "CALL sp_InsertarProducto(?, ?, ?, ?)";

    conexion.query(
      sql,
      [idTipoProducto, nombre, precio, cantidad],
      (err, result) => {
        if (err) {
          console.error("Error al ejecutar el procedimiento almacenado:", err);
          res.status(500).json({ error: "Error al insertar el producto" });
          return;
        }

        res.json(result);
      }
    );
  });

  server.post("/api/addTipoProducto", (req, res) => {
    const data = req.body;
    const descripcion = data.descripcion;

    const sql = "CALL sp_InsertarTipoProducto(?)";

    conexion.query(sql, [descripcion], (err, result) => {
      if (err) {
        console.error("Error al ejecutar el procedimiento almacenado:", err);
        res.status(500).json({ error: "Error al insertar el producto" });
        return;
      }

      res.json(result);
    });
  });

  server.delete("/api/deleteProducto", (req, res) => {
    const data = req.body;
    const idProducto = data.id;

    const sql = "CALL sp_EliminarProducto(?)";

    conexion.query(sql, [idProducto], (err, result) => {
      if (err) {
        console.error("Error al ejecutar el procedimiento almacenado:", err);
        res.status(500).json({ error: "Error al insertar el producto" });
        return;
      }

      res.json(result);
    });
  });

  server.put("/api/updateProducto", (req, res) => {
    console.log(req.body);
    const data = req.body;
    const idProducto = data.id;
    const tipoProducto = Number(data.tipoProducto);
    const nombre = data.nombre;
    const precio = data.precio;
    const cantidad = data.cantidad;

    const sql = "CALL sp_ModificarProducto(?,?,?,?,?)";

    conexion.query(
      sql,
      [idProducto, tipoProducto, nombre, precio, cantidad],
      (err, result) => {
        if (err) {
          console.error("Error al ejecutar el procedimiento almacenado:", err);
          res.status(500).json({ error: "Error al insertar el producto" });
          return;
        }

        res.json(result);
      }
    );
  });

  server.get("/api/getTipoProducto", (req, res) => {
    let sql = "SELECT * FROM tipoProducto";
    conexion.query(sql, (err, result) => {
      res.send(result);
    });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  createServer(server).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
