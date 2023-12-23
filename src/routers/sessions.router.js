import { Router } from "express";
import { usersManager } from "../dao/mongodb/models/User.js";
export const sessionRouter = Router();

sessionRouter.post("/", async (req, res) => {
  const user = await usersManager.findOne(req.body);
  if (!user) {
    return res.status(401).json({ message: "error de login" });
  }

  req.session["user"] = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };
  if (user.email === "adminCoder@coder.com" && user.password === "admin") {
    req.session["user"].rol = "admin";
  } else {
    req.session["user"].rol = "user";
  }
  res
    .status(201)
    .json({ message: "login succes", payload: req.session["user"] });
});

sessionRouter.delete("/current", async (req, res) => {
  req.session.destroy((err) => {
    res.status(204).json({ message: "logout success" });
  });
});
