import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const router = Router();

// Login GET
router.get("/", (req, res) => {
  res.render("login", { error: null });
});

// Login POST
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.render("login", { error: "Credenciales Incorrectas" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.render("login", { error: "Credenciales Incorrectas" });

  req.session.userId = user.id;
  req.session.role = user.role;

  if (user.role === "admin") {
    return res.redirect("/admin/dashboard");
  } else {
    return res.redirect("/user/dashboard");
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
