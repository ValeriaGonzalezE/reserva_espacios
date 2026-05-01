const express = require("express");
const router = express.Router();
const controller = require("../controllers/espacios.controller");
const upload = require("../config/multer");


router.get("/", controller.getEspacios);
router.get("/tipos", controller.getTipos);

router.post("/", upload.array("fotos", 5), controller.createEspacio);

router.get("/mis-espacios/:id", controller.getMisEspacios);
router.get("/:id", controller.getEspacio);
router.put("/:id", controller.updateEspacio);
router.delete("/:id", controller.deleteEspacio);

router.get("/comentarios/:id", controller.getComentarios);
router.post("/comentarios", controller.createComentario);
module.exports = router;