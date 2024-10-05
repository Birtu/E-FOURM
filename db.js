const mysql = require("mysql2");
// import mysql from 'mysql2'

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "evangadi_form",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Database connected successfully");
});

// Export the connection
module.exports = { connection };
// export { connection };