const Meal = require("../models/Meal");

/* ===============================
   Calorie Estimation
================================ */
const calorieMap = {
  rice: 200,
  fried_rice: 280,
  chapati: 100,
  paratha: 180,
  bread: 80,
  dal: 180,
  rajma: 220,
  chole: 240,
  paneer_curry: 300,
  veg_curry: 150,
  egg: 78,
  omelette: 120,
  milk: 150,
  curd: 120,
  banana: 105,
  apple: 95,
  mango: 135,
  samosa: 260,
  pakora: 300,
  tea: 70,
  coffee: 90,
};

const estimateCalories = (food, qty) => {
  return (calorieMap[food] || 150) * qty;
};

/* ===============================
   Home (Today)
================================ */
exports.getHome = async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const meals = await Meal.find({
    user: req.user._id,
    date: today,
  }).sort({ _id: -1 });

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

  const goal = req.user.dailyGoal;
const percent = Math.min((totalCalories / goal) * 100, 150);

  res.render("home", { groupedByDate, totalCalories,goal,percent });
};

/* ===============================
   Add Meal
================================ */
exports.addMeal = async (req, res) => {
  if (!req.user) return res.redirect("/auth/google");

  const { food, quantity, unit, mealType } = req.body;

  const total = estimateCalories(food, Number(quantity));

  await Meal.create({
    user: req.user._id,
    food,
    quantity: Number(quantity),
    unit,
    mealType,
    total,
  });

  res.redirect("/");
};

/* ===============================
   Yesterday
================================ */
exports.getYesterday = async (req, res) => {
  if (!req.user) return res.redirect("/");

  const start = new Date();
  start.setDate(start.getDate() - 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  const meals = await Meal.find({
    user: req.user._id,
    date: { $gte: start, $lte: end },
  }).sort({ _id: -1 });

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

  res.render("home", { groupedByDate, totalCalories });
};

/* ===============================
   Delete Meal
================================ */
exports.deleteMeal = async (req, res) => {
  await Meal.findByIdAndDelete(req.params.id);
  res.redirect("back");
};


exports.updateGoal = async (req, res) => {
  if (!req.user) return res.redirect("/");

  const goal = Number(req.body.dailyGoal);

  if (goal < 800 || goal > 6000) {
    return res.redirect("/home");
  }

  req.user.dailyGoal = goal;
  await req.user.save();

  res.redirect("/home");
};
