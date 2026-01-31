exports.getHealth = (req, res) => {
  if (!req.user) return res.redirect("/");
  res.render("health");
};

exports.postHealth = async (req, res) => {
  if (!req.user) return res.redirect("/");

  const { age, gender, height, weight, activity } = req.body;

  const hMeters = height / 100;
  const bmi = +(weight / (hMeters * hMeters)).toFixed(1);

  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  // 🔐 SAVE privately in MongoDB
  req.user.health = {
    age,
    gender,
    height,
    weight,
    activity,
    bmi,
    category,
    lastUpdated: new Date(),
  };

  // OPTIONAL: auto-adjust calorie goal
  if (category === "Underweight") req.user.dailyGoal = 2600;
  if (category === "Overweight") req.user.dailyGoal = 1800;
  if (category === "Obese") req.user.dailyGoal = 1600;

  await req.user.save();

  // ✅ Show RESULT page, NOT stored values
  res.render("health-result", {
    bmi,
    category,
  });
};
