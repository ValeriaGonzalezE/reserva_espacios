const model = require("../models/espacios.model");
const db = require("../config/db");

exports.getEspacios = (req, res) => {
  model.getEspacios(req.query, (err, result) => {
    res.json(result);
  });
};

exports.getEspacio = (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT e.*, t.nombre AS tipo
     FROM espacios e
     JOIN tipos_espacio t ON e.tipo_id = t.id
     WHERE e.id = ?`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const espacio = result[0];

      db.query(
        "SELECT url FROM espacio_fotos WHERE espacio_id = ?",
        [id],
        (err2, fotos) => {
          if (err2) return res.status(500).json(err2);

          espacio.fotos = fotos.map(f => f.url);

          res.json(espacio);
        }
      );
    }
  );
};

exports.getTipos = (req, res) => {
  model.getTipos((err, result) => res.json(result));
};

exports.createEspacio = (req, res) => {
  const data = req.body;

  db.query(
    `INSERT INTO espacios 
    (nombre, tipo_id, capacidad, ubicacion, descripcion, requiere_pago, precio, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.nombre,
      data.tipo_id,
      data.capacidad,
      data.ubicacion,
      data.descripcion,
      data.requiere_pago,
      data.precio,
      data.usuario_id
    ],
    (err, result) => {
      if (err) {
        console.error("ERROR ESPACIO:", err);
        return res.status(500).json(err);
      }

      const espacio_id = result.insertId;

      // SI NO HAY FOTOS
      if (!req.files || req.files.length === 0) {
        return res.json({ message: "Espacio creado sin fotos" });
      }

      // GUARDAR FOTOS
      let guardadas = 0;

      req.files.forEach(file => {
        const url = `http://localhost:3000/uploads/${file.filename}`;

        db.query(
          "INSERT INTO espacio_fotos (espacio_id, url) VALUES (?, ?)",
          [espacio_id, url],
          (err2) => {
            if (err2) {
              console.error("ERROR FOTO:", err2);
            }

            guardadas++;

            // cuando termine de guardar todas
            if (guardadas === req.files.length) {
              res.json({
                message: "Espacio creado con fotos",
                fotos: guardadas
              });
            }
          }
        );
      });
    }
  );
};

exports.getMisEspacios = (req, res) => {
  model.getMisEspacios(req.params.id, (err, result) => res.json(result));
};

exports.getEspacio = (req, res) => {
  model.getEspacio(req.params.id, (err, result) => res.json(result[0]));
};

exports.updateEspacio = (req, res) => {
  model.updateEspacio(req.params.id, req.body, () =>
    res.json({ success: true })
  );
};

exports.deleteEspacio = (req, res) => {
  model.deleteEspacio(req.params.id, () =>
    res.json({ success: true })
  );
};

exports.getComentarios = (req, res) => {
  model.getComentarios(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.createComentario = (req, res) => {
  model.createComentario(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Comentario creado" });
  });
};