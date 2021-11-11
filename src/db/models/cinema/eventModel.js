const Sequelize = require("sequelize");
const db = require("../../config/database");

const EventModel = db.define("Events", {
  movieId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  seats: {
    type: Sequelize.TEXT,
    allowNull: false,
    get: function () {
      return JSON.parse(this.getDataValue("seats"));
    },
    set: function (value) {
      this.setDataValue("seats", JSON.stringify(value));
    },
  },
});

module.exports = EventModel;
