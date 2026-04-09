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

    // Simulación
    res.json({
      success: true,
      message: "Correo enviado (simulado)"
    });
  });
});


app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});

// ============= ESPACIOS ===================

app.get("/espacios", (req, res) => {
  const sql = `
    SELECT 
      e.id,
      e.nombre,
      e.capacidad,
      e.ubicacion,
      t.nombre AS tipo
    FROM espacios e
    JOIN tipos_espacio t ON e.tipo_id = t.id
    WHERE e.estado = 'activo'
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});


//para saber si esta ocupado o con disponibilidad

app.get("/espacios-disponibilidad", (req, res) => {

  const fecha = req.query.fecha;

  const sql = `
    SELECT 
      e.id,
      e.nombre,
      e.ubicacion,
      t.nombre AS tipo,
      CASE 
        WHEN r.id IS NULL THEN 'Disponible'
        ELSE 'Ocupado'
      END AS estado
    FROM espacios e
    JOIN tipos_espacio t ON e.tipo_id = t.id
    LEFT JOIN reservas r 
      ON e.id = r.espacio_id 
      AND r.fecha = ?
      AND r.estado = 'activa'
  `;

  db.query(sql, [fecha], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});


//================ RESERVAS ===============

app.post("/reservas", (req, res) => {
  const { usuario_id, espacio_id, fecha, hora_inicio, hora_fin } = req.body;

  const validar = `
    SELECT * FROM reservas
    WHERE espacio_id = ?
    AND fecha = ?
    AND (
      hora_inicio < ? AND hora_fin > ?
    )
  `;

  db.query(validar, [espacio_id, fecha, hora_fin, hora_inicio], (err, result) => {
    if (result.length > 0) {
      return res.json({ success: false, message: "Horario ocupado" });
    }

    const insert = `
      INSERT INTO reservas (usuario_id, espacio_id, fecha, hora_inicio, hora_fin)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insert, [usuario_id, espacio_id, fecha, hora_inicio, hora_fin], (err2) => {
      if (err2) return res.status(500).json(err2);

      res.json({ success: true });
    });
  });
});
