const express = require("express");
const router = express.Router();
const controller = require("../controllers/espacios.controller");

router.get("/", controller.getEspacios);
router.get("/tipos", controller.getTipos);
router.post("/", controller.createEspacio);
router.get("/mis-espacios/:id", controller.getMisEspacios);
router.get("/:id", controller.getEspacio);
router.put("/:id", controller.updateEspacio);
router.delete("/:id", controller.deleteEspacio);

module.exports = router;