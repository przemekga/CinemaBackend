const Sequelize = require("sequelize");
const db = require("../../config/database");

const SeatModel = db.define("Seats", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = SeatModel;
