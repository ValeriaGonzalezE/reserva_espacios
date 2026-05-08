const express = require("express");

const router = express.Router();

const controller =
  require("../controllers/usuarios.controller");

const upload =
  require("../config/multer");

router.put(
  "/:id",
  upload.single("foto"),
  controller.updateUsuario
);

module.exports = router;