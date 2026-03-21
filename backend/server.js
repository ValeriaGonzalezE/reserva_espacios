const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reservaespacios"
});

db.connect(err => {
  if (err) {
    console.log("Error conectando a MySQL:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

app.post("/login", (req, res) => {

  const { codigo, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE codigo = ? AND password = ?";

  db.query(sql, [codigo, password], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (result.length > 0) {
      res.json({
        success: true,
        user: result[0]
      });
    } else {
      res.json({
        success: false,
        message: "Credenciales incorrectas"
      });
    }

  });

});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
