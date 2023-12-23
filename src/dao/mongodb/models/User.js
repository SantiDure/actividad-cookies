import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const collection = "users";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

export const usersManager = mongoose.model(collection, userSchema);
