import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import { AppError } from '../lib/errors/app-error';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const loginService = async (id: string, password: string) => {
  const user: User | null = await prisma.$queryRawUnsafe(
    `SELECT id, name, email, password FROM "User" WHERE id='${id}'`
  );

    if (!user)  throw new AppError("User not found", 404);
  
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new AppError("Invalid password", 401);

  return user;
};