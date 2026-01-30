const Meal = require("../models/Meal");
const estimateCalories = require("../utils/calorieEstimator");

exports.getHome = async (req, res) => {
  const meals = await Meal.find().sort({ date: -1, _id: -1 });

  const groupedByDate = {};
  let totalCalories = 0;

  meals.forEach(meal => {
    const dateKey = meal.date.toISOString().split("T")[0]; // YYYY-MM-DD

    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = {
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

    groupedByDate[dateKey].meals[meal.mealType].push(meal);
    groupedByDate[dateKey].total += meal.total;
    totalCalories += meal.total;
  });

  res.render("home", {
    groupedByDate,
    totalCalories,
  });
};



exports.addMeal = async (req, res) => {
  const { food, quantity, unit ,mealType } = req.body;


  console.log("Meal type received:", mealType); // TEMP DEBUG


  const total = estimateCalories(food, Number(quantity));

  await Meal.create({
    food,
    quantity: Number(quantity),
    unit,
    mealType,
    total,
  });

  res.redirect("/");
};
