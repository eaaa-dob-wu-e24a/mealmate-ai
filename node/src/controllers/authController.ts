import bcrypt from "bcrypt";
import { Request, Response } from "express";
import Token from "../models/tokens.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export async function registerUser(req: Request, res: Response) {
  try {
    const { email, username, password, tags, name } = req.body;
    const user = await User.create({ email, username, password, tags, name });
    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(409).json({
        error: `An account with this ${field} already exists`,
        field: field,
      });
    } else if (error instanceof mongoose.Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to register user" });
    }
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    await Token.create({
      user: user._id,
      token: user.password,
    });

    const session = await Token.findOne({ user: user._id }).populate("user");
    res.status(200).json({ user: session?.user, token: session?.token });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to login user" });
    }
  }
}

export async function logoutUser(req: Request, res: Response) {
  const auth = res.locals.auth;

  try {
    await Token.deleteOne({ token: auth.token });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to logout user" });
    }
  }
}
