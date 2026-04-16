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
  if (err) console.log(err);
  else console.log("conectado a MySQL");
});

// ================= AUTH =================

// REGISTRO
app.post("/register", async (req, res) => {
  const { nombre, apellido, email, codigo, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO usuarios (nombre, apellido, email, codigo, password) VALUES (?, ?, ?, ?, ?)",
    [nombre, apellido, email, codigo, hashed],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { codigo, password } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE codigo = ? OR email = ?",
    [codigo, codigo],
    async (err, result) => {
      if (result.length === 0) return res.json({ success: false });

      const user = result[0];
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) return res.json({ success: false });

      const token = jwt.sign({ id: user.id }, SECRET_KEY);

      res.json({ success: true, token, user });
    }
  );
});

// ================= ESPACIOS =================

// LISTAR + FILTROS
app.get("/espacios", (req, res) => {
  const { fecha, hora_inicio, hora_fin } = req.query;

  let sql = `
    SELECT e.*, t.nombre AS tipo,
    CASE 
      WHEN r.id IS NOT NULL THEN 'Ocupado'
      ELSE 'Disponible'
    END AS disponibilidad
    FROM espacios e
    JOIN tipos_espacio t ON e.tipo_id = t.id
    LEFT JOIN reservas r 
      ON e.id = r.espacio_id
      AND r.fecha = ?
      AND (r.hora_inicio < ? AND r.hora_fin > ?)
    WHERE e.estado = 'activo'
  `;

  db.query(sql, [fecha, hora_fin, hora_inicio], (err, result) => {
    res.json(result);
  });
});


//filtro tipos de espacio
app.get("/tipos", (req, res) => {
  db.query("SELECT * FROM tipos_espacio", (err, result) => {
    res.json(result);
  });
});


// CREAR ESPACIO
app.post("/espacios", (req, res) => {
  const { nombre, tipo_id, capacidad, ubicacion, descripcion, precio, requiere_pago, usuario_id } = req.body;

  db.query(
    `INSERT INTO espacios 
    (nombre, tipo_id, capacidad, ubicacion, descripcion, precio, requiere_pago, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, tipo_id, capacidad, ubicacion, descripcion, precio, requiere_pago, usuario_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// HISTORIAL ESPACIOS (los que creó el usuario)
app.get("/mis-espacios/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT e.*, t.nombre AS tipo
     FROM espacios e
     JOIN tipos_espacio t ON e.tipo_id = t.id
     WHERE e.usuario_id = ?`,
    [id],
    (err, result) => {
      res.json(result);
    }
  );
});


// ================= RESERVAS =================

// CREAR RESERVA
app.get("/reservas-por-espacio", (req, res) => {
  const { espacio_id, fecha } = req.query;

  db.query(
    `SELECT hora_inicio, hora_fin 
     FROM reservas 
     WHERE espacio_id = ? AND fecha = ?`,
    [espacio_id, fecha],
    (err, result) => {
      res.json(result);
    }
  );
});

//vista de reservas hechas
app.get("/reservas-espacio/:id", (req, res) => {
  const espacioId = req.params.id;

  db.query(
    `SELECT 
      r.id,
      r.fecha,
      r.hora_inicio,
      r.hora_fin,

      u.nombre AS usuario_nombre,
      u.telefono

     FROM reservas r
     JOIN usuarios u ON r.usuario_id = u.id
     WHERE r.espacio_id = ?`,
    [espacioId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});


app.post("/reservas", (req, res) => {
  const { usuario_id, espacio_id, fecha, hora_inicio, hora_fin } = req.body;

  const validar = `
  SELECT * FROM reservas
  WHERE espacio_id = ?
  AND fecha = ?
  AND NOT (
    hora_fin <= ? OR hora_inicio >= ?
  )
`;

  db.query(validar, [espacio_id, fecha, hora_fin, hora_inicio], (err, result) => {
    if (result.length > 0) {
      return res.json({ success: false, message: "Horario ocupado" });
    }

    db.query(
      `INSERT INTO reservas (usuario_id, espacio_id, fecha, hora_inicio, hora_fin)
       VALUES (?, ?, ?, ?, ?)`,
      [usuario_id, espacio_id, fecha, hora_inicio, hora_fin],
      () => res.json({ success: true })
    );
  });
});

// HISTORIAL RESERVAS
app.get("/mis-reservas/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT 
      r.id,
      r.fecha,
      r.hora_inicio,
      r.hora_fin,

      e.nombre,
      e.capacidad,
      e.precio,
      e.requiere_pago,
      e.imagen,
      e.ubicacion,
      e.descripcion

     FROM reservas r
     JOIN espacios e ON r.espacio_id = e.id
     WHERE r.usuario_id = ?`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

//====== espacios modificar =======
app.get("/espacio/:id", (req, res) => {
  db.query("SELECT * FROM espacios WHERE id = ?", [req.params.id], (err, result) => {
    res.json(result[0]);
  });
});

app.put("/espacio/:id", (req, res) => {
  const data = req.body;

  db.query(
    `UPDATE espacios SET 
      nombre=?, capacidad=?, ubicacion=?, descripcion=?, 
      estado=?, requiere_pago=?, precio=?
     WHERE id=?`,
    [
      data.nombre,
      data.capacidad,
      data.ubicacion,
      data.descripcion,
      data.estado,
      data.requiere_pago,
      data.precio,
      req.params.id
    ],
    () => res.json({ success: true })
  );
});

app.delete("/espacio/:id", (req, res) => {
  db.query("DELETE FROM espacios WHERE id = ?", [req.params.id], () => {
    res.json({ success: true });
  });
});

//====== actualizar usuario (perfil)=====
app.put("/usuario/:id", async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, password, imagen } = req.body;

    let sql = `
      UPDATE usuarios SET 
      nombre=?, apellido=?, email=?, telefono=?, imagen=?
    `;

    let params = [nombre, apellido, email, telefono || null, imagen || null];

    if (password && password !== "") {
      const hashed = await bcrypt.hash(password, 10);
      sql += `, password=?`;
      params.push(hashed);
    }

    sql += ` WHERE id=?`;
    params.push(req.params.id);

    db.query(sql, params, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});



app.listen(3000, () => console.log("Servidor en puerto 3000"));
