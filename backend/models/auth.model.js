const db = require("../config/db");

exports.createUser = (data, callback) => {
  const { nombre, apellido, email, codigo, password } = data;

  db.query(
    "INSERT INTO usuarios (nombre, apellido, email, codigo, password) VALUES (?, ?, ?, ?, ?)",
    [nombre, apellido, email, codigo, password],
    callback
  );
};

exports.findUser = (codigo, callback) => {
  db.query(
    "SELECT * FROM usuarios WHERE codigo = ? OR email = ?",
    [codigo, codigo],
    callback
  );
};