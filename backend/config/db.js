const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "sql5.freesqldatabase.com",
  user: "sql5824928",
  password: "bXIECB3W62",
  database: "sql5824928"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("conectado a MySQL");
});

module.exports = db;