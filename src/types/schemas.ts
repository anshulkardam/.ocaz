import { Genre, ProjectionType, SoundSystemType } from "@/generated/prisma/enums";
import z from "zod";

export const createMovieSchema = z.object({
  genre: z.enum(Genre),
  title: z.string("Movie Name is Required"),
  director: z.string("Director Name is Required").min(1, "Name cannot be less than 1 characters"),
  duration: z.number("Duration is Required").min(1, "Duration must be at least 1 minute"),
  releaseDate: z.date(),
  posterUrl: z.url().optional(),
});

export const updateMovieSchema = createMovieSchema.extend({
  id: z.string("Movie ID is required").min(1),
});

export const createScreenSchema = z.object({
  projectionType: z.enum(ProjectionType),
  soundSystemType: z.enum(SoundSystemType),
  rows: z.number(),
  columns: z.number(),
  price: z.number(),
});

export const createAddressSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  address: z.string(),
});

export const createCinemaSchema = z.object({
  managerId: z.string().min(1, "Manager ID is required"),
  cinemaName: z.string().min(1, "Cinema name is required"),
  address: createAddressSchema,
  screens: z.array(createScreenSchema),
});

export const createShowtimeSchema = z.object({
  movieId: z.string().min(1, "Movie is required"),
  screenId: z.string().min(1, "Screen is required"),
  startTime: z.date({ error: "Start time is required" }),
});

export const updateShowtimeSchema = z.object({
  id: z.string(),
  startTime: z.date().optional(),
  status: z.enum(["ACTIVE", "POSTPONED", "CANCELLED"]).optional(),
});

export type CreateShowtimeInput = z.infer<typeof createShowtimeSchema>;
export type UpdateShowtimeInput = z.infer<typeof updateShowtimeSchema>;
