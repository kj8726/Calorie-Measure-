exports.getStarter = (req, res) => {
  if (req.user) {
    return res.redirect("/home");
  }

  res.render("starter");
};
