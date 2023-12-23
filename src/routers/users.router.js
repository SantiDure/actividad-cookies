import { Router } from "express";
import { usersManager } from "../dao/mongodb/models/User.js";

export const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  try {
    const user = await usersManager.create(req.body);
    res.status(201).json({ status: "succes", payload: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
