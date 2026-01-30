const Meal = require("../models/Meal");
const estimateCalories = require("../utils/calorieEstimator");

exports.getHome = async (req, res) => {
  const meals = await Meal.find().sort({ _id: -1 });

  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.total,
    0
  );

  res.render("home", { meals, totalCalories });
};

exports.addMeal = async (req, res) => {
  const { food, quantity, unit } = req.body;

  const total = estimateCalories(food, Number(quantity));

  await Meal.create({
    food,
    quantity: Number(quantity),
    unit,
    total,
  });

  res.redirect("/");
};
