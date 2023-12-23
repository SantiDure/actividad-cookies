export function onlySessionActive(req, res, next) {
  if (!req.session["user"]) {
    res.redirect("unauthorized");
  }
  next();
}
