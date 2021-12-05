const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const Events = require("../../models/cinema/eventModel");
const Movies = require("../../models/movies/movieModel");
const userTypes = require("../../../../consts");
const { Op } = require("sequelize");
const { verifyAccess } = require("../../../../jwtTokens/verifyToken");

router.get("/", (req, res) => {
  Events.findAll()
    .then((events) => {
      Movies.findAll()
        .then((movies) => {
          let newEvents = [];
          events.map((event) => {
            movies.map((movie) => {
              if (event.dataValues.movieId === movie.dataValues.id) {
                delete event.dataValues["movieId"];
                newEvents.push({
                  ...event.dataValues,
                  movie: movie.dataValues,
                });
              }
            });
          });

          console.log(newEvents);
          res.statusCode = 200;
          res.json(newEvents);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.json({ ...err, message: "Błąd serwera" });
    });
});

router.post("/", (req, res) => {
  const data = verifyAccess(req, res);
  if (
    data &&
    (data.type === userTypes.ADMIN || data.type === userTypes.PERSONEL)
  ) {
    const startDate = Date.parse(req.body.startDate);
    const endDate = Date.parse(req.body.endDate);

    Events.create({
      movieId: req.body.movieId,
      startDate: startDate,
      endDate: endDate,
      seats: req.body.seats,
    })
      .then((result) => {
        res.statusCode = 200;
        res.json(result);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ ...err, message: "Błąd jakiś" });
      });
  } else {
    res.sendStatus(403);
  }
});

router.put("/", (req, res) => {
  const data = verifyAccess(req, res);
  if (
    data &&
    (data.type === userTypes.ADMIN || data.type === userTypes.PERSONEL)
  ) {
    const startDate = Date.parse(req.body.startDate);
    const endDate = Date.parse(req.body.endDate);
    console.log(req.body, startDate, endDate);
    Events.update(
      {
        movieId: req.body.movieId,
        startDate,
        endDate,
        seats: req.body.seats,
      },
      { where: { id: req.body.id } }
    )
      .then((result) => {
        res.statusCode = 200;
        res.json(result);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ ...err, message: "Błąd serwera" });
      });
  } else {
    res.sendStatus(403);
  }
});

router.delete("/", (req, res) => {
  const data = verifyAccess(req, res);
  if (
    data &&
    (data.type === userTypes.ADMIN || data.type === userTypes.PERSONEL)
  ) {
    Events.destroy({ where: { id: req.body.id } })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(err);
      });
  }
});
module.exports = router;
