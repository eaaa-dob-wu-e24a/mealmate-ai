import { Request, Response } from "express";
import { User } from "../models/index.js";

export async function getAllContacts(req: Request, res: Response) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function getContactById(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
}

export async function createContact(req: Request, res: Response) {
  try {
    const { email, name } = req.body;
    const user = await User.create({ email, name });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create contact" });
  }
}

export async function updateContact(req: Request, res: Response) {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, name },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
}

export async function deleteContact(req: Request, res: Response) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
}

export async function searchContacts(req: Request, res: Response) {
  const { q } = req.query;
  try {
    const users = await User.find({
      $or: [
        { email: { $regex: q as string, $options: "i" } },
        { name: { $regex: q as string, $options: "i" } },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search users" });
  }
}
