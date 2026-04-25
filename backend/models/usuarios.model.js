const db = require("../config/db");

exports.updateUsuario = (id, data, callback) => {
  db.query(
    `UPDATE usuarios SET 
    nombre=?, apellido=?, email=?, telefono=?, foto=?, password=?
    WHERE id=?`,
    [
      data.nombre,
      data.apellido,
      data.email,
      data.telefono,
      data.foto,
      data.password,
      id
    ],
    callback
  );
};