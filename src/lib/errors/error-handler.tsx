export const errorHandler = (error: any) => {
  return Response.json(
    {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    },
    {
      status: error.status || 500,
    }
  );
};
