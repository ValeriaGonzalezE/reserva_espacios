const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = "clave_secreta";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reservaespacios"
});

db.connect(err => {
  if (err) {
    console.log("Error conectando:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});


// REGISTRO
app.post("/register", async (req, res) => {
  const { nombre, apellido, email, codigo, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO usuarios (nombre, apellido, email, codigo, password)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nombre, apellido, email, codigo, hashedPassword], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ success: true });
  });
});


// LOGIN
app.post("/login", (req, res) => {
  const { codigo, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE codigo = ? OR email = ?";

  db.query(sql, [codigo, codigo], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.json({ success: false, message: "Usuario no encontrado" });
    }

    const user = result[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.json({ success: false, message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      token,
      user
    });
  });
});


// OLVIDE CONTRASEÑA 
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.json({ success: false, message: "Correo no existe" });
    }

    // Simulación (luego puedes enviar correo real)
    res.json({
      success: true,
      message: "Correo enviado (simulado)"
    });
  });
});


app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});
