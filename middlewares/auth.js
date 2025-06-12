export function isAdmin(req, res, next) {
  if (req.session && req.session.role === "admin") return next();
  res.redirect("/");
}
export function isUser(req, res, next) {
  if (req.session && req.session.role === "user") return next();
  res.redirect("/");
}
