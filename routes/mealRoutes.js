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

router.get("/yesterday", async (req, res) => {
  const Meal = require("../models/Meal");

  // Yesterday range
  const start = new Date();
  start.setDate(start.getDate() - 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  const meals = await Meal.find({
    date: { $gte: start, $lte: end }
  }).sort({ _id: -1 });

  // SAME grouping logic as home
  const groupedByDate = {};
  let totalCalories = 0;

  meals.forEach(meal => {
    const key = meal.date.toISOString().split("T")[0];

    if (!groupedByDate[key]) {
      groupedByDate[key] = {
        date: meal.date,
        total: 0,
        meals: {
          breakfast: [],
          lunch: [],
          snacks: [],
          dinner: [],
        },
      };
    }

    groupedByDate[key].meals[meal.mealType].push(meal);
    groupedByDate[key].total += meal.total;
    totalCalories += meal.total;
  });

  // 🚨 THIS IS THE MOST IMPORTANT LINE
  res.render("home", {
    groupedByDate,
    totalCalories,
  });
});



module.exports = router;
