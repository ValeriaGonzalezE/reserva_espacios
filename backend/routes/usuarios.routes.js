const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuarios.controller");

router.put("/:id", controller.updateUsuario);

module.exports = router;