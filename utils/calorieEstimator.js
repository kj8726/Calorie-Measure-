const calorieMap = {
  // 🌾 Grains & Staples
  rice: 200,              // per plate
  fried_rice: 300,        // per plate
  chapati: 100,           // per piece
  roti: 100,
  paratha: 180,           // plain
  bread: 80,              // per slice
  dosa: 170,              // plain
  idli: 60,               // per piece
  poha: 180,              // per bowl
  upma: 200,              // per bowl

  // 🍛 Curries & Cooked Food
  dal: 180,               // per bowl
  rajma: 220,
  chole: 240,
  paneer_curry: 280,
  veg_curry: 180,
  chicken_curry: 250,
  chicken_fry: 320,
  fish_curry: 220,
  egg_curry: 240,

  // 🍳 Eggs & Dairy
  egg: 78,                // per egg
  omelette: 120,          // 2 eggs
  milk: 150,              // per cup
  curd: 120,              // per cup
  butter: 100,            // 1 tbsp
  cheese: 110,            // slice

  // 🍌 Fruits
  banana: 105,
  apple: 95,
  orange: 62,
  mango: 200,             // medium
  grapes: 60,             // cup

  // 🥔 Snacks & Sides
  potato: 150,            // boiled medium
  sabzi: 150,             // dry veg
  peanuts: 170,           // handful
  pakora: 250,            // small plate
  samosa: 260,            // single

  // ☕ Drinks
  tea: 40,                // with milk & sugar
  coffee: 60,
  juice: 120,
};


function estimateCalories(food, quantity) {
  const key = food.toLowerCase();
  const baseCalories = calorieMap[key] || 200; // fallback estimate
  return baseCalories * quantity;
}

module.exports = estimateCalories;
