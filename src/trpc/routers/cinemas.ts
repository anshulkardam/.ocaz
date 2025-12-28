import { createCinemaSchema } from "@/types/schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const cinemaRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.cinema.findMany({
      include: {
        Screens: { include: { Showtimes: { include: { Movie: true } } } },
        Address: true,
        Managers: { include: { User: true } },
      },
    });
  }),
  create: protectedProcedure("admin")
    .input(createCinemaSchema)
    .mutation(async ({ ctx, input }) => {
      const { address, cinemaName, managerId, screens } = input;

      const screensCreate = screens.map((s, index) => {
        const number = index + 1;
        const seats = [];
        for (let r = 1; r <= s.rows; r++) {
          for (let c = 1; c <= s.columns; c++) {
            seats.push({
              row: r,
              column: c,
              // TODO: add type for different seat types
              // type: s.defaultSeatType || "REGULAR"
            });
          }
        }

        return {
          number,
          projectionType: s.projectionType,
          soundSystemType: s.soundSystemType,
          price: s.price,
          Seats: {
            create: seats,
          },
        };
      });

      const created = await ctx.db.cinema.create({
        data: {
          name: cinemaName,
          Address: {
            create: {
              address: address.address,
              lat: address.lat,
              lng: address.lng,
            },
          },
          Managers: {
            connectOrCreate: {
              where: { id: managerId },
              create: {
                id: managerId,
              },
            },
          },
          Screens: {
            create: screensCreate,
          },
        },
        include: {
          Address: true,
          Managers: { include: { User: true } },
          Screens: { include: { Seats: true } },
        },
      });

      return created;
    }),
});
