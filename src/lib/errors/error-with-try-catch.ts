import { errorHandler } from "./error-handler";

export const withErrorHandler = (handler: Function) => {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      return errorHandler(error);
    }
  };
};