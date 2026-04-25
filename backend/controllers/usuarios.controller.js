const bcrypt = require("bcrypt");
const model = require("../models/usuarios.model");

exports.updateUsuario = async (req, res) => {
  const { password } = req.body;

  let data = { ...req.body };

  if (password && password !== "") {
    data.password = await bcrypt.hash(password, 10);
  }

  model.updateUsuario(req.params.id, data, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};