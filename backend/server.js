const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./routes/auth.routes"));
app.use("/espacios", require("./routes/espacios.routes"));
app.use("/reservas", require("./routes/reservas.routes"));
app.use("/usuarios", require("./routes/usuarios.routes"));

app.listen(3000, () => console.log("Servidor en puerto 3000"));