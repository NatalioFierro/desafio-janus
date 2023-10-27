import mysql from "mysql";
export const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "desafio",
  charset: "utf8mb4",
});


