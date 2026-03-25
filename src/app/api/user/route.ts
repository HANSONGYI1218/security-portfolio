import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export const register = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
};