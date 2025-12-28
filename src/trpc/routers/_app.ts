import { publicProcedure, createTRPCRouter } from "../init";
import { adminRouter } from "./admin";
import { cinemaRouter } from "./cinemas";
import { managerRouter } from "./manager";
import { moviesRouter } from "./movies";
import { showtimeRouter } from "./showtimes";
import { userRouter } from "./users";

export const appRouter = createTRPCRouter({
  health: publicProcedure.query(async (opts) => {
    return {
      status: "ok",
      timestamp: Date.now(),
    };
  }),
  admin: adminRouter,
  user: userRouter,
  movies: moviesRouter,
  cinemas: cinemaRouter,
  manager: managerRouter,
  showtimes: showtimeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
