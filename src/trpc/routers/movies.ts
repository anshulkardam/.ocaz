import { createMovieSchema } from "@/types/schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const moviesRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.movie.findMany();
  }),
  create: protectedProcedure("admin")
    .input(createMovieSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.movie.create({ data: input });
    }),
});
