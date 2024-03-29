const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  createPrediction,
  updatePrediction,
  getPrediction,
  getPredictionFromSport,
  getPredictions,
  deletePrediction,
} = require("../controllers/sportController");
const { adminProtect } = require("../middleware/authMiddleware");

router
  .route("/create/:sport")
  .post(
    adminProtect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createPrediction
  );
router
  .route("/update/:id")
  .put(
    adminProtect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    updatePrediction
  );
router.route("/single/:date/:teamA/:teamB").get(getPrediction);
router.route("/:date").get(getPredictions);
router.route("/sport/:value/:date").get(getPredictionFromSport);
router.route("/delete/:id").delete(adminProtect, deletePrediction);

module.exports = router;
