const express = require("express");
const router = express.Router();
const controller = require("../controllers/reservas.controller");

router.get("/por-espacio", controller.getReservasPorEspacio);
router.get("/espacio/:id", controller.getReservasEspacio);
router.post("/", controller.createReserva);
router.get("/mis-reservas/:id", controller.getMisReservas);
router.put("/cancelar/:id", controller.cancelarReserva);

module.exports = router;