import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const adminRouter = createTRPCRouter({
  //stats dashboard router
  list: protectedProcedure("admin").query(({ ctx }) => {
    return ctx.db.admin.findMany();
  }),
  me: protectedProcedure("admin").query(({ ctx }) => {
    return ctx.db.admin.findUnique({ where: { id: ctx.userId }, include: { User: true } });
  }),
  // create: protectedProcedure("admin")
  //   .input(createAdminSchema)
  //   .query(({ ctx, input }) => {
  //     //check if admin exists
  //     return ctx.db.admin.create({ data: input });
  //   }),
});
