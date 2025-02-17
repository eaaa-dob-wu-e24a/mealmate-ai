import { Request, Response, NextFunction } from "express";
import Token from "models/tokens.js";

const whitelist = ["/api/auth/login", "/api/auth/register"];

export async function middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (whitelist.some((path) => req.path.startsWith(path))) {
    next();
    return;
  }

  const token = req.headers.authorization;

  const auth = await Token.findOne({
    token: token?.replace("Bearer ", ""),
  }).populate("user");

  if (!auth) {
    res.status(401).json({ error: "Please provide a valid Bearer token" });
    return;
  }
  res.locals.auth = auth;
  next();
}
