const db = require("../config/db");

exports.getEspacios = (filters, callback) => {
  const { fecha, tipo, pago } = filters;

  let sql = `
    SELECT e.*, t.nombre AS tipo,
    GROUP_CONCAT(CONCAT(r.hora_inicio, ' - ', r.hora_fin) SEPARATOR ', ') AS horarios_ocupados
    FROM espacios e
    JOIN tipos_espacio t ON e.tipo_id = t.id
    LEFT JOIN reservas r 
      ON e.id = r.espacio_id
      AND r.estado = 'activa'
      ${fecha ? "AND r.fecha = ?" : ""}
    WHERE e.estado = 'activo'
  `;

  let params = [];

  if (fecha) params.push(fecha);
  if (tipo) {
    sql += " AND t.nombre = ?";
    params.push(tipo);
  }
  if (pago) {
    sql += " AND e.requiere_pago = ?";
    params.push(pago);
  }

  sql += " GROUP BY e.id";

  db.query(sql, params, callback);
};

exports.getTipos = (callback) => {
  db.query("SELECT * FROM tipos_espacio", callback);
};

exports.createEspacio = (data, callback) => {
  db.query(
    `INSERT INTO espacios 
    (nombre, tipo_id, capacidad, ubicacion, descripcion, precio, requiere_pago, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.nombre,
      data.tipo_id,
      data.capacidad,
      data.ubicacion,
      data.descripcion,
      data.precio,
      data.requiere_pago,
      data.usuario_id
    ],
    callback
  );
};

exports.getMisEspacios = (id, callback) => {
  db.query(
    `SELECT e.*, t.nombre AS tipo
     FROM espacios e
     JOIN tipos_espacio t ON e.tipo_id = t.id
     WHERE e.usuario_id = ?`,
    [id],
    callback
  );
};

exports.getEspacio = (id, callback) => {
  db.query("SELECT * FROM espacios WHERE id = ?", [id], callback);
};

exports.updateEspacio = (id, data, callback) => {
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
      id
    ],
    callback
  );
};

exports.deleteEspacio = (id, callback) => {
  db.query("DELETE FROM espacios WHERE id = ?", [id], callback);
};