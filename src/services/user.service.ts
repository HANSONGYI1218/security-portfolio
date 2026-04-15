import prisma from "../lib/prisma";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const findUserByEmail = async (email: string) => {
  const users: User[] = await prisma.$queryRawUnsafe(
    `SELECT id, name, email FROM "User" WHERE email='${email}'`
  );

  const user = users[0];

  if (!user) return null;

  return user;
};
