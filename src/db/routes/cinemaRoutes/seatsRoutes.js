const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const Seats = require("../../models/cinema/seatModel");

router.get("/", (req, res) => {
  Seats.findAll()
    .then((seat) => {
      res.statusCode = 200;
      res.json(seat);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.json(err);
    });
});

router.post("/", (req, res) => {
  Seats.create({
    name: req.body.name,
  })
    .then((seat) => {
      res.statusCode = 201;
      res.json(seat);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.json({
        message: "Problem with adding seat.",
        err,
      });
    });
});

module.exports = router;
