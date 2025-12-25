import { createCinemaSchema } from "@/types/schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const cinemaRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.cinema.findMany({
      include: { Screens: { include: { Showtimes: { include: { Movie: true } } } } },
    });
  }),
  create: protectedProcedure("admin")
    .input(createCinemaSchema)
    .mutation(({ ctx, input }) => {
      const { address, cinemaName, managerId, screens } = input;

      return ctx.db.cinema.create({
        data: {
          name: cinemaName,
          Managers: {
            connectOrCreate: {
              create: {
                id: managerId,
              },
              where: {
                id: managerId,
              },
            },
          },
        },
      });
    }),
});
