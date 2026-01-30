const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");

router.get("/", mealController.getHome);
router.post("/add", mealController.addMeal);

router.post("/delete/:id", async (req, res) => {
  const Meal = require("../models/Meal");

  await Meal.findByIdAndDelete(req.params.id);
  res.redirect("/");
});


module.exports = router;
