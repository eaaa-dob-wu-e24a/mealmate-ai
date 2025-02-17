import { Request, Response } from "express";
import User from "../models/user.js";
import mongoose from "mongoose";

export async function getUser(req: Request, res: Response) {
  const auth = res.locals.auth;

  try {
    const id = auth.user._id;

    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to get user" });
    }
  }
}

export async function updateUser(req: Request, res: Response) {
  const auth = res.locals.auth;
  const id = auth.user._id;

  const { username, email, password, name, tags, onboarded } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      username,
      email,
      password,
      name,
      tags,
      onboarded,
    });

    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to update user" });
    }
  }
}
