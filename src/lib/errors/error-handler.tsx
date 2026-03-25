import { AppError } from "./app-error";

export const errorHandler = (error: unknown) => {
  if (error instanceof AppError) {
    return Response.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }

  console.error(error);

  return Response.json(
    { message: "Internal Server Error" },
    { status: 500 }
  );
};