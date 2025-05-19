const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const {
  fullPlayerSchema,
  partialPlayerSchema,
} = require("../validators/playerValidator");
const validator = require("express-joi-validation").createValidator({});

// 🔹 GET all players
router.get("/players", playerController.listPlayers);

// 🔹 CREATE a player with full validation
router.post(
  "/players",
  validator.body(fullPlayerSchema),
  playerController.createPlayer
);

// 🔹 UPDATE (full) a player by ID using PUT
router.put(
  "/players/:id",
  validator.body(fullPlayerSchema),
  playerController.updatePlayer
);

// 🔹 UPDATE (partial) a player by ID using PATCH
router.patch(
  "/players/:id",
  validator.body(partialPlayerSchema),
  playerController.updatePlayer
);

// 🔹 DELETE a player by ID
router.delete("/players/:id", playerController.deletePlayer);

// 🔹 GET only description for player by ID
router.get("/players/:id/description", playerController.getPlayerDescription);

// 🔹 GET player by ID
router.get("/players/:id", playerController.getPlayerById);

module.exports = router;
