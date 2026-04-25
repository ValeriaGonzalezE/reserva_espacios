const model = require("../models/reservas.model");

exports.getReservasPorEspacio = (req, res) => {
  model.getReservasPorEspacio(
    req.query.espacio_id,
    req.query.fecha,
    (err, result) => res.json(result)
  );
};

exports.getReservasEspacio = (req, res) => {
  model.getReservasEspacio(req.params.id, (err, result) => res.json(result));
};

exports.createReserva = (req, res) => {
  model.createReserva(req.body, (err, result) => {
    if (result?.ocupado) {
      return res.json({ success: false, message: "Horario ocupado" });
    }
    res.json({ success: true });
  });
};

exports.getMisReservas = (req, res) => {
  model.getMisReservas(req.params.id, (err, result) => res.json(result));
};

exports.cancelarReserva = (req, res) => {
  model.cancelarReserva(req.params.id, () =>
    res.json({ success: true })
  );
};