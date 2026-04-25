const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reservaespacios"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("conectado a MySQL");
});

module.exports = db;