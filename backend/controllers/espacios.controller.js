const model = require("../models/espacios.model");

exports.getEspacios = (req, res) => {
  model.getEspacios(req.query, (err, result) => {
    res.json(result);
  });
};

exports.getTipos = (req, res) => {
  model.getTipos((err, result) => res.json(result));
};

exports.createEspacio = (req, res) => {
  model.createEspacio(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
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