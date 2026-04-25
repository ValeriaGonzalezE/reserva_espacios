const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth.model");

const SECRET_KEY = "clave_secreta";

exports.register = async (req, res) => {
  const { nombre, apellido, email, codigo, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  authModel.createUser(
    { nombre, apellido, email, codigo, password: hashed },
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
};

exports.login = (req, res) => {
  const { codigo, password } = req.body;

  authModel.findUser(codigo, async (err, result) => {
    if (result.length === 0) return res.json({ success: false });

    const user = result[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.json({ success: false });

    const token = jwt.sign({ id: user.id }, SECRET_KEY);

    res.json({ success: true, token, user });
  });
};