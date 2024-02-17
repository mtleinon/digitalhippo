import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({

  // TODO: Remove this test route
  // anyApiRoute: publicProcedure.query(
  //   (): { id: number; name: string } => ({ id: 3, name: 'Mika' }))

  auth: authRouter,
});

export type AppRouter = typeof appRouter;