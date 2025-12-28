import { createMovieSchema, updateMovieSchema } from "@/types/schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";
import z from "zod";

export const moviesRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.movie.findMany();
  }),
  create: protectedProcedure("admin")
    .input(createMovieSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.movie.create({ data: input });
    }),
  getById: protectedProcedure("admin")
    .input(z.object({ id: z.string("Movie ID is required") }))
    .query(({ ctx, input }) => {
      return ctx.db.movie.findFirst({ where: { id: input.id } });
    }),
  update: protectedProcedure("admin")
    .input(updateMovieSchema)
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;

      return ctx.db.movie.update({
        where: { id },
        data,
      });
    }),
  delete: protectedProcedure("admin")
    .input(z.object({ id: z.string("Movie ID is required") }))
    .mutation(({ ctx, input }) => {
      return ctx.db.movie.delete({ where: { id: input.id } });
    }),
});
