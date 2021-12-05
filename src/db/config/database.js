const Sequelize = require("sequelize");
//initialize dotenv
require("dotenv").config();
//exporting db object
module.exports = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "127.0.0.1",
    dialect: "mysql",
  }
);
