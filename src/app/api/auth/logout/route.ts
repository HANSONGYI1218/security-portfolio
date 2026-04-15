import { loginService } from "@/services/auth.service";
import {withErrorHandler} from "@/lib/errors/error-with-try-catch";

  export const POST = withErrorHandler(async (req: Request) => {
  const { email, password } = await req.json();

  const user = await loginService(email, password);

  return Response.json({ user });
});
