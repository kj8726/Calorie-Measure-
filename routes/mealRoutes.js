const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");


const mealController = require("../controllers/mealController");
const starterController = require("../controllers/starterController");

/* ===============================
   Starter / Landing Page
================================ */
router.get("/", starterController.getStarter);

/* ===============================
   Home (After Login)
================================ */
router.get("/home", mealController.getHome);

/* ===============================
   Add Meal
================================ */
router.post("/add", mealController.addMeal);

/* ===============================
   Yesterday
================================ */
router.get("/yesterday", mealController.getYesterday);

/* ===============================
   Delete Meal
================================ */
router.post("/delete/:id", mealController.deleteMeal);

module.exports = router;

router.post("/goal", mealController.updateGoal);

router.get("/health", healthController.getHealth);
router.post("/health", healthController.postHealth);