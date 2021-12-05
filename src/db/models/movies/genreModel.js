const Sequelize = require("sequelize");
const db = require("../../config/database");

const GenreModel = db.define("Genres", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = GenreModel;
