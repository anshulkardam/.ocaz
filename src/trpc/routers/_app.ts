import { publicProcedure, createTRPCRouter } from "../init";
import { adminRouter } from "./admin";
import { moviesRouter } from "./movies";
import { userRouter } from "./users";

export const appRouter = createTRPCRouter({
  health: publicProcedure.query(async (opts) => {
    return {
      status: "ok",
      timestamp: Date.now(),
    };
  }),
  movies: moviesRouter,
  admin: adminRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
