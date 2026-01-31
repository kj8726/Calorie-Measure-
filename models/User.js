const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  photo: String,

  dailyGoal: {
    type: Number,
    default: 2200,
  },

  // 🔒 Health data (PRIVATE)
  health: {
    age: Number,
    gender: String,
    height: Number, // cm
    weight: Number, // kg
    activity: String,

    bmi: Number,
    category: String,

    lastUpdated: Date,
  },

  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
});

module.exports = mongoose.model("User", userSchema);
