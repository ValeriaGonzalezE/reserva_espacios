const db = require("../config/db");

exports.getReservasPorEspacio = (espacio_id, fecha, callback) => {
  db.query(
    `SELECT hora_inicio, hora_fin 
     FROM reservas 
     WHERE espacio_id = ? AND fecha = ?`,
    [espacio_id, fecha],
    callback
  );
};

exports.getReservasEspacio = (id, callback) => {
  db.query(
    `SELECT 
      r.id, r.fecha, r.hora_inicio, r.hora_fin,
      u.nombre AS usuario_nombre, u.telefono
     FROM reservas r
     JOIN usuarios u ON r.usuario_id = u.id
     WHERE r.espacio_id = ?`,
    [id],
    callback
  );
};

exports.createReserva = (data, callback) => {
  const validar = `
    SELECT * FROM reservas
    WHERE espacio_id = ?
    AND fecha = ?
    AND estado = 'activa'
    AND NOT (hora_fin <= ? OR hora_inicio >= ?)
  `;

  db.query(validar, [data.espacio_id, data.fecha, data.hora_fin, data.hora_inicio], (err, result) => {
    if (result.length > 0) {
      return callback(null, { ocupado: true });
    }

    db.query(
      `INSERT INTO reservas (usuario_id, espacio_id, fecha, hora_inicio, hora_fin)
       VALUES (?, ?, ?, ?, ?)`,
      [data.usuario_id, data.espacio_id, data.fecha, data.hora_inicio, data.hora_fin],
      callback
    );
  });
};

exports.getMisReservas = (id, callback) => {
  db.query(
    `SELECT r.id, r.fecha, r.hora_inicio, r.hora_fin,
      e.nombre, e.capacidad, e.precio, e.requiere_pago, e.imagen, e.ubicacion, e.descripcion
     FROM reservas r
     JOIN espacios e ON r.espacio_id = e.id
     WHERE r.usuario_id = ?
     AND r.estado = 'activa'`,
    [id],
    callback
  );
};

exports.cancelarReserva = (id, callback) => {
  db.query("UPDATE reservas SET estado='cancelada' WHERE id=?", [id], callback);
};