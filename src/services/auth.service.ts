import bcrypt from "bcrypt";
import { AppError } from "../lib/errors/app-error";
import prisma from "../lib/prisma";
import { findUserByEmail } from "./user.service";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const login = async (email: string, password: string) => {
  console.log("Login attempt:", { email, password });
  const users: User[] = await prisma.$queryRawUnsafe(
    `SELECT id, name, email, password FROM "User" WHERE email='${email}'`
  );

  const user = users[0];

  if (!user) throw new AppError("User not found", 404);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new AppError("Invalid password", 401);

  return user;
};

export const register = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await findUserByEmail(email);

  if (existingUser) throw new AppError("User already exists", 409);

  const users: User[] = await prisma.$queryRawUnsafe(
    `INSERT INTO "User" (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}') RETURNING id, name, email, password`
  );

  const user = users[0];

  if (!user) throw new AppError("User creation failed", 500);

  return user;
};
