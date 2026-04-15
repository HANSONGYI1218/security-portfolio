import { withErrorHandler } from "@/lib/errors/error-with-try-catch";
import { register } from "@/services/auth.service";

export const POST = withErrorHandler(async (req: Request) => {
  const { name, email, password } = await req.json();

  const user = await register(name, email, password);

  return Response.json({ user });
});
