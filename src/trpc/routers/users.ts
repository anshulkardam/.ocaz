import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";
import z from "zod";
export const userRouter = createTRPCRouter({
  list: protectedProcedure("admin").query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
  me: protectedProcedure().query(({ ctx }) => {
    return {
      id: ctx.userId,
    };
  }),
  search: protectedProcedure("admin")
    .input(z.object({ q: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const q = input.q;
      const managers = await ctx.db.user.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 10,
      });

      return managers.map((m) => ({ id: m.id, user: m }));
    }),
});
