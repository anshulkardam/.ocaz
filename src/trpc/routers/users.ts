import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";
export const userRouter = createTRPCRouter({
  list: protectedProcedure("admin").query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
  me: protectedProcedure().query(({ ctx }) => {
    return {
      id: ctx.userId,
    };
  }),
});
