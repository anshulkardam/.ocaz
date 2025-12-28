import z from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const managerRouter = createTRPCRouter({
  search: protectedProcedure("admin")
    .input(z.object({ q: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const q = input.q;
      const managers = await ctx.db.manager.findMany({
        where: {
          User: {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
            ],
          },
        },
        include: { User: true },
        take: 10,
      });

      return managers.map((m) => ({ id: m.id, user: m.User }));
    }),
});
