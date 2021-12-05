const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const Genres = require("../../models/movies/genreModel");
const userTypes = require("../../../../consts");
const {
  verifyAccess,
  checkCookies,
} = require("../../../../jwtTokens/verifyToken");
const e = require("express");

router.get("/", (req, res) => {
  Genres.findAll()
    .then((genres) => {
      res.statusCode = 200;
      res.json(genres);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const data = verifyAccess(req, res);

  if (data && data.type === userTypes.ADMIN) {
    Genres.create({
      name: req.body.name,
    })
      .then((genres) => {
        res.statusCode = 201;
        res.json(genres);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json(err);
      });
  } else {
    res.sendStatus(403);
  }
});

router.put("/", (req, res) => {
  const data = verifyAccess(req, res);

  if (data && data.type === userTypes.ADMIN) {
    Genres.update(
      {
        name: req.body.name,
      },
      { where: { id: req.body.id } }
    )
      .then((genres) => {
        res.statusCode = 200;
        res.json(genres);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json(err);
      });
  } else {
    res.sendStatus(403);
  }
});

router.delete("/", (req, res) => {
  const data = verifyAccess(req, res);

  if (data && data.type === userTypes.ADMIN) {
    Genres.destroy({ where: { id: req.body.id } })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(err);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
