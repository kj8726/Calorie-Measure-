const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

dotenv.config();
const app = express();

/* ===============================
   MongoDB
================================ */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

/* ===============================
   Middleware
================================ */
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("trust proxy", 1);

/* ===============================
   Sessions
================================ */
app.use(
  session({
    secret: "calorie-measure-secret",
    resave: false,
    saveUninitialized: false,
  })
);

/* ===============================
   Passport
================================ */
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

/* Make user available to all views */
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* ===============================
   Routes
================================ */
app.use("/", require("./routes/mealRoutes"));
app.use("/auth", require("./routes/authRoutes"));

/* ===============================
   Server
================================ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
