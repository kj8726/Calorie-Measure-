const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  food: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "snacks", "dinner"],
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0),
  },
});

module.exports = mongoose.model("Meal", mealSchema);
