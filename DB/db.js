const knex = require("knex")
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
db
  .raw("SELECT 1")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

module.exports = db;