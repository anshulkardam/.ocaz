import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const createShowtimeSchema = z.object({
  movieId: z.string().min(1, "Movie is required"),
  screenId: z.string().min(1, "Screen is required"),
  startTime: z.date(),
});

const updateShowtimeSchema = z.object({
  id: z.string(),
  startTime: z.date().optional(),
  status: z.enum(["ACTIVE", "POSTPONED", "CANCELLED"]).optional(),
});

const showtimeFiltersSchema = z.object({
  cinemaId: z.string().optional(),
  status: z.enum(["ACTIVE", "POSTPONED", "CANCELLED"]).optional(),
  date: z.string().optional(),
  movieId: z.string().optional(),
  searchQuery: z.string().optional(),
});

export const showtimeRouter = createTRPCRouter({
  list: publicProcedure
    .input(showtimeFiltersSchema)
    .query(async ({ ctx, input }) => {
      const { cinemaId, status, date, movieId, searchQuery } = input;

      const where: any = {};

      if (status) {
        where.status = status;
      }

      if (movieId) {
        where.movieId = movieId;
      }

      if (cinemaId) {
        where.Screen = { cinemaId };
      }

      if (date) {
        const startOfDay = new Date(date + "T00:00:00.000Z");
        const endOfDay = new Date(date + "T23:59:59.999Z");
        where.startTime = {
          gte: startOfDay,
          lte: endOfDay,
        };
      }

      // If search query, search in movie title or cinema name
      if (searchQuery) {
        where.OR = [
          { Movie: { title: { contains: searchQuery, mode: "insensitive" } } },
          { Screen: { Cinema: { name: { contains: searchQuery, mode: "insensitive" } } } },
        ];
      }

      const showtimes = await ctx.db.showtime.findMany({
        where,
        include: {
          Movie: true,
          Screen: {
            include: {
              Cinema: true,
            },
          },
          _count: {
            select: {
              Bookings: true,
            },
          },
        },
        orderBy: { startTime: "asc" },
      });

      return showtimes;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const showtime = await ctx.db.showtime.findUnique({
        where: { id: input.id },
        include: {
          Movie: true,
          Screen: {
            include: {
              Cinema: true,
            },
          },
          _count: {
            select: {
              Bookings: true,
              tickets: true,
            },
          },
        },
      });

      if (!showtime) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Showtime not found",
        });
      }

      return showtime;
    }),

  create: protectedProcedure("admin", "manager")
    .input(createShowtimeSchema)
    .mutation(async ({ ctx, input }) => {
      const { movieId, screenId, startTime } = input;

      const movie = await ctx.db.movie.findUnique({
        where: { id: movieId },
      });

      if (!movie) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Movie not found",
        });
      }

      const screen = await ctx.db.screen.findUnique({
        where: { id: screenId },
        include: { Cinema: true },
      });

      if (!screen) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Screen not found",
        });
      }

      const userRoles = await ctx.db.user.findUnique({
        where: { id: ctx.userId },
        include: {
          Manager: true,
          Admin: true,
        },
      });

      if (userRoles?.Manager && !userRoles.Admin) {
        if (userRoles.Manager.cinemaId !== screen.cinemaId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You can only create showtimes for your cinema",
          });
        }
      }

      // Check for conflicts - no overlapping showtimes on same screen
      const movieEndTime = new Date(startTime.getTime() + movie.duration * 60000);
      const conflictingShowtimes = await ctx.db.showtime.findMany({
        where: {
          screenId,
          status: { not: "CANCELLED" },
          OR: [
            {
              // New showtime starts during existing showtime
              AND: [
                { startTime: { lte: startTime } },
                {
                  startTime: {
                    gte: new Date(startTime.getTime() - 180 * 60000), // 3 hours buffer
                  },
                },
              ],
            },
          ],
        },
        include: { Movie: true },
      });

      // Check if any conflict with proper buffer time (30 min cleanup)
      for (const existing of conflictingShowtimes) {
        const existingEndTime = new Date(
          existing.startTime.getTime() + existing.Movie.duration * 60000 + 30 * 60000
        );
        
        if (startTime < existingEndTime && movieEndTime > existing.startTime) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Time conflict with existing showtime at ${existing.startTime.toLocaleTimeString()}`,
          });
        }
      }

      const showtime = await ctx.db.showtime.create({
        data: {
          movieId,
          screenId,
          startTime,
          status: "ACTIVE",
        },
        include: {
          Movie: true,
          Screen: {
            include: {
              Cinema: true,
            },
          },
        },
      });

      return showtime;
    }),

  update: protectedProcedure("admin", "manager")
    .input(updateShowtimeSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const showtime = await ctx.db.showtime.findUnique({
        where: { id },
        include: {
          Screen: { include: { Cinema: true } },
          Movie: true,
        },
      });

      if (!showtime) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Showtime not found",
        });
      }

      const userRoles = await ctx.db.user.findUnique({
        where: { id: ctx.userId },
        include: {
          Manager: true,
          Admin: true,
        },
      });

      if (userRoles?.Manager && !userRoles.Admin) {
        if (userRoles.Manager.cinemaId !== showtime.Screen.cinemaId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You can only update showtimes for your cinema",
          });
        }
      }

      // If updating time, check for conflicts
      if (updateData.startTime) {
        const movieEndTime = new Date(
          updateData.startTime.getTime() + showtime.Movie.duration * 60000
        );

        const conflictingShowtimes = await ctx.db.showtime.findMany({
          where: {
            screenId: showtime.screenId,
            id: { not: id },
            status: { not: "CANCELLED" },
          },
          include: { Movie: true },
        });

        for (const existing of conflictingShowtimes) {
          const existingEndTime = new Date(
            existing.startTime.getTime() + existing.Movie.duration * 60000 + 30 * 60000
          );

          if (updateData.startTime < existingEndTime && movieEndTime > existing.startTime) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Time conflict with existing showtime at ${existing.startTime.toLocaleTimeString()}`,
            });
          }
        }
      }

      const updated = await ctx.db.showtime.update({
        where: { id },
        data: updateData,
        include: {
          Movie: true,
          Screen: {
            include: {
              Cinema: true,
            },
          },
        },
      });

      return updated;
    }),

  delete: protectedProcedure("admin", "manager")
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const showtime = await ctx.db.showtime.findUnique({
        where: { id: input.id },
        include: {
          Screen: { include: { Cinema: true } },
          _count: {
            select: {
              Bookings: true,
            },
          },
        },
      });

      if (!showtime) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Showtime not found",
        });
      }

      const userRoles = await ctx.db.user.findUnique({
        where: { id: ctx.userId },
        include: {
          Manager: true,
          Admin: true,
        },
      });

      if (userRoles?.Manager && !userRoles.Admin) {
        if (userRoles.Manager.cinemaId !== showtime.Screen.cinemaId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You can only delete showtimes for your cinema",
          });
        }
      }

      // Don't allow deletion if there are bookings
      if (showtime._count.Bookings > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot delete showtime with existing bookings. Cancel it instead.",
        });
      }

      await ctx.db.showtime.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  getStats: protectedProcedure("admin", "manager")
    .query(async ({ ctx }) => {
      const now = new Date();
      const startOfToday = new Date(now.setHours(0, 0, 0, 0));
      const endOfToday = new Date(now.setHours(23, 59, 59, 999));

      // Get user role to filter by cinema if manager
      const userRoles = await ctx.db.user.findUnique({
        where: { id: ctx.userId },
        include: {
          Manager: true,
          Admin: true,
        },
      });

      const cinemaFilter = userRoles?.Manager && !userRoles.Admin
        ? { Screen: { cinemaId: userRoles.Manager.cinemaId } }
        : {};

      const [total, active, today, upcoming] = await Promise.all([
        ctx.db.showtime.count({
          where: cinemaFilter,
        }),
        ctx.db.showtime.count({
          where: {
            ...cinemaFilter,
            status: "ACTIVE",
          },
        }),
        ctx.db.showtime.count({
          where: {
            ...cinemaFilter,
            startTime: {
              gte: startOfToday,
              lte: endOfToday,
            },
          },
        }),
        ctx.db.showtime.count({
          where: {
            ...cinemaFilter,
            status: "ACTIVE",
            startTime: {
              gte: new Date(),
            },
          },
        }),
      ]);

      return {
        total,
        active,
        today,
        upcoming,
      };
    }),
});