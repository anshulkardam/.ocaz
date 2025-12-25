import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const adminRouter = createTRPCRouter({
  list: protectedProcedure("admin").query(({ ctx }) => {
    return ctx.db.admin.findMany();
  }),
  me: protectedProcedure("admin").query(({ ctx }) => {
    return ctx.db.admin.findUnique({ where: { id: ctx.userId } });
  }),
});
