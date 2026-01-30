const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");

router.get("/", mealController.getHome);
router.post("/add", mealController.addMeal);

module.exports = router;
